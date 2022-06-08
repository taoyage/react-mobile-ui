const configs = require('@taoyage/configs/eslint-ts');

module.exports = {
  ...configs,
  settings: {
    ...configs.settings,
    'import/resolver': {
      alias: {
        map: [['@', './packages']],
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    },
  },
};
