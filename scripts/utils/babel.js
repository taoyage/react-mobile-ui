const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const chalk = require('chalk');
const gulpIf = require('gulp-if');
const gulpAlias = require('gulp-ts-alias');
const gulpTs = require('gulp-typescript');
const gulpStyle = require('gulp-style-aliases');
const gulpSass = require('gulp-sass')(require('sass'));
const slash = require('slash2');
const rimraf = require('rimraf');
const through = require('through2');
const vfs = require('vinyl-fs');
const signale = require('signale');
const getBabelConfig = require('./getBabelConfig');
const log = require('./log');

module.exports = function (opts) {
  const { cwd, type } = opts;

  const srcPath = path.join(cwd, 'packages');
  const targetDir = type === 'esm' ? 'es' : 'lib';
  const targetPath = path.join(cwd, targetDir);

  log(chalk.gray(`Clean ${targetDir} directory`));
  rimraf.sync(targetPath);

  const tsConfigPath = path.join(cwd, 'tsconfig.json');

  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8')).compilerOptions || {};
  function isTsFile(path) {
    return /\.tsx?$/.test(path) && !path.endsWith('.d.ts');
  }

  function isStyleFile(path) {
    return /\._?(css|scss)?$/.test(path);
  }

  function isTransform(path) {
    const babelTransformRegexp = /\.(t|j)sx?$/;
    return babelTransformRegexp.test(path) && !path.endsWith('.d.ts');
  }

  function transform(opts) {
    const { file, type } = opts;
    const babelOptions = getBabelConfig(type);
    const relFile = slash(file.path).replace(`${cwd}/`, '');
    log(`Transform to ${type} for ${chalk['yellow'](relFile)}`);

    return babel.transform(file.contents, {
      ...babelOptions,
      filename: file.path,
    }).code;
  }

  function createStream(src) {
    return vfs
      .src(src, {
        allowEmpty: true,
        base: srcPath,
      })
      .pipe(gulpIf((f) => isTsFile(f.path), gulpAlias({ configuration: tsConfig })))
      .pipe(gulpIf((f) => isStyleFile(f.path), gulpAlias({ configuration: tsConfig })))
      .pipe(
        gulpIf(
          (f) => isStyleFile(f.path),
          gulpStyle({
            '@': 'packages',
          })
        )
      )
      .pipe(gulpIf((f) => isStyleFile(f.path), gulpSass()))
      .pipe(
        gulpIf(
          (f) => isTransform(f.path),
          through.obj((file, env, cb) => {
            try {
              file.contents = Buffer.from(
                transform({
                  file,
                  type,
                })
              );
              // .jsx -> .js
              file.path = file.path.replace(path.extname(file.path), '.js');
              cb(null, file);
            } catch (e) {
              signale.error(`Compiled faild: ${file.path}`);
              console.log(e);
              cb(null);
            }
          })
        )
      )
      .pipe(vfs.dest(targetPath));
  }

  function createTypeStream(src) {
    return vfs
      .src(src, {
        allowEmpty: true,
        base: srcPath,
      })
      .pipe(gulpIf((f) => isTsFile(f.path), gulpAlias({ configuration: tsConfig })))
      .pipe(gulpIf((f) => isTsFile(f.path), gulpTs({ ...tsConfig, files: [path.join(cwd, 'typings.d.ts')] })))
      .pipe(vfs.dest(targetPath));
  }

  const patterns = [path.join(srcPath, '**/*')];

  return new Promise((resolve) => {
    createTypeStream(patterns).on('end', resolve);
  }).then(
    () =>
      new Promise((resolve) => {
        createStream(patterns).on('end', resolve);
      })
  );
};
