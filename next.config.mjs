export function webpack(config, options) {
    if (options.isServer) config.devtool = 'source-map';
    return config;
  }
  