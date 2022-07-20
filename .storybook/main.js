const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

function resolve(...dirs) {
  return path.join(__dirname, '../', ...dirs);
}

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: (config, { configType }) => {
    const isProd = configType === 'PRODUCTION';
    const env = isProd ? 'production' : 'development';

    config.mode = env;

    config.devtool = isProd ? false : 'cheap-module-source-map';

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': resolve('packages'),
      },
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
        },
      ],
      include: [resolve('stories'), resolve('packages'), resolve('demos')],
    });

    config.plugins.push(
      new ReactRefreshWebpackPlugin({
        overlay: false,
      })
    );

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: `[name]${isProd ? '.[hash]' : ''}.css`,
        chunkFilename: `[id]${isProd ? '.[hash]' : ''}.css`,
      })
    );

    return config;
  },
};
