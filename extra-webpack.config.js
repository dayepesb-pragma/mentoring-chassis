const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const Dotenv = require('dotenv-webpack');

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  singleSpaWebpackConfig.plugins.push(
    new Dotenv()
  );
  singleSpaWebpackConfig.output = {
    ...singleSpaWebpackConfig.output,
    libraryTarget: 'system' // o cualquier valor que necesites
  };

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};