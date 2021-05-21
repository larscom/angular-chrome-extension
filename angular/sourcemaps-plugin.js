const { mergeWithCustomize, customizeObject } = require('webpack-merge');

exports.default = {
  config: (cfg) => {
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
    //
    // Sort of hack to find SourceMapDevToolPlugin, instanceof webpack.SourceMapDevToolPlugin doesn't work
    result.plugins = result.plugins.filter((plugin) => {
      try {
        return !JSON.stringify(plugin).includes('sourceMappingURL=[url]');
      } catch (error) {}
      return true;
    });

    return result;
  }
};
