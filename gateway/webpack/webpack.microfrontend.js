const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require('../package.json');
const appVersion = packageJson.version;

module.exports = ({ serve }) => {
  return {
    optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
      runtimeChunk: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        shareScope: 'default',
        remotes: {
          '@blog': `blog@/services/blog/remoteEntry.js`,
          '@store': `store@/services/store/remoteEntry.js`,
        },
        shared: {
          ...Object.fromEntries(
            Object.entries(packageJson.dependencies).map(([module, version]) => [
              module,
              { requiredVersion: version, singleton: true, shareScope: 'default' },
            ])
          ),
          'app/config/constants': {
            singleton: true,
            import: 'app/config/constants',
            requiredVersion: appVersion,
          },
          'app/config/store': {
            singleton: true,
            import: 'app/config/store',
            requiredVersion: appVersion,
          },
          'app/shared/error/error-boundary-routes': {
            singleton: true,
            import: 'app/shared/error/error-boundary-routes',
            requiredVersion: appVersion,
          },
          'app/shared/layout/menus/menu-components': {
            singleton: true,
            import: 'app/shared/layout/menus/menu-components',
            requiredVersion: appVersion,
          },
          'app/shared/layout/menus/menu-item': {
            singleton: true,
            import: 'app/shared/layout/menus/menu-item',
            requiredVersion: appVersion,
          },
          'app/shared/reducers': {
            singleton: true,
            import: 'app/shared/reducers',
            requiredVersion: appVersion,
          },
          'app/shared/reducers/locale': {
            singleton: true,
            import: 'app/shared/reducers/locale',
            requiredVersion: appVersion,
          },
          'app/shared/reducers/reducer.utils': {
            singleton: true,
            import: 'app/shared/reducers/reducer.utils',
            requiredVersion: appVersion,
          },
          'app/shared/util/date-utils': {
            singleton: true,
            import: 'app/shared/util/date-utils',
            requiredVersion: appVersion,
          },
          'app/shared/util/entity-utils': {
            singleton: true,
            import: 'app/shared/util/entity-utils',
            requiredVersion: appVersion,
          },
        },
      }),
    ],
    output: {
      publicPath: 'auto',
    },
  };
};
