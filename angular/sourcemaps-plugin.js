const { mergeWithCustomize, customizeObject } = require('webpack-merge');
const webpack = require('webpack');

exports.default = {
  config: function (cfg) {
    // first, we replace devtool in the webpack used by the angular cli to have the value 'inline-source-map'
    const strategy = mergeWithCustomize({
      customizeObject: customizeObject({
        devtool: 'replace'
      })
    });
    const result = strategy(cfg, {
      devtool: 'inline-source-map'
    });

    // then we find SourceMapDevToolPlugin and remove it
    // This is because we should never use both the devtool option and plugin together.
    // The devtool option adds the plugin internally so you would end up with the plugin applied twice.
    // See https://webpack.js.org/configuration/devtool/
    const index = result.plugins.findIndex((plugin) => {
      return plugin instanceof webpack.SourceMapDevToolPlugin;
    });
    result.plugins.splice(index, 1);

    return result;
  }
};
