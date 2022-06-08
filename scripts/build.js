const log = require('./utils/log');
const babel = require('./utils/babel');

async function build() {
  const cwd = process.cwd();

  const bundleOpts = {
    entry: 'packages/index.tsx',
  };

  log('Build cjs with babel');
  await babel({ cwd, type: 'cjs', bundleOpts });

  log('Build esm with babel');
  await babel({ cwd, type: 'esm', importLibToEs: true, bundleOpts });
}

build();
