function getBabelConfig(type) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: type === 'esm' ? false : 'commonjs',
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not dead'],
          },
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
  };
}

module.exports = getBabelConfig;
