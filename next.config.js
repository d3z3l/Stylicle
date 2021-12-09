const withCSS = require('@zeit/next-css');

global.navigator = () => null;

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = file => {};
}

module.exports = withCSS({});
module.exports = {
  
  future: {
    webpack5: false,
  },
  webpack: (config, {
      buildId,
      dev,
      isServer,
      defaultLoaders,
      webpack
  }) => {

    // if (!isServer) {
    //   if (!isServer) config.resolve.fallback.fs = false;
    //     return config;
    //   }

      if (!isServer) {
        config.resolve.fallback.fs = false;
        return config;
      }
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      config.plugins.push(
          new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              "window.jQuery": "jquery"
          })
      );
      // Important: return the modified config
      return config;
  }
}

