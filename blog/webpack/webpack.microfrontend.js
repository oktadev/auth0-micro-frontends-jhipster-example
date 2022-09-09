const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { DefinePlugin } = require('webpack');

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
        name: 'blog',
        filename: 'remoteEntry.js',
        shareScope: 'default',
        exposes: {
          './entities-menu': './src/main/webapp/app/entities/menu',
          './entities-routes': './src/main/webapp/app/entities/routes',
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
      new DefinePlugin({
        BLOG_I18N_RESOURCES_PREFIX: JSON.stringify(''),
      }),
    ],
    output: {
      publicPath: 'auto',
    },
  };
};
