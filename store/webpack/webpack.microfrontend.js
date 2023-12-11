const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { DefinePlugin } = require('webpack');

const packageJson = require('../package.json');
// Microfrontend api, should match across gateway and microservices.
const apiVersion = '0.0.1';

const sharedDefaults = { singleton: true, strictVersion: true, requiredVersion: apiVersion };
const shareMappings = (...mappings) => Object.fromEntries(mappings.map(map => [map, { ...sharedDefaults, version: apiVersion }]));

const shareDependencies = ({ skipList = [] } = {}) =>
  Object.fromEntries(
    Object.entries(packageJson.dependencies)
      .filter(([dependency]) => !skipList.includes(dependency))
      .map(([dependency, version]) => [dependency, { ...sharedDefaults, version, requiredVersion: version }]),
  );

module.exports = ({ serve }) => {
  return {
    optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
      runtimeChunk: false,
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'store',
        filename: 'remoteEntry.js',
        shareScope: 'default',
        exposes: {
          './entities-menu': './src/main/webapp/app/entities/menu',
          './entities-routes': './src/main/webapp/app/entities/routes',
        },
        shared: {
          ...shareDependencies(),
          ...shareMappings(
            'app/config/constants',
            'app/config/store',
            'app/shared/error/error-boundary-routes',
            'app/shared/layout/menus/menu-components',
            'app/shared/layout/menus/menu-item',
            'app/shared/reducers',
            'app/shared/reducers/locale',
            'app/shared/reducers/reducer.utils',
            'app/shared/util/date-utils',
            'app/shared/util/entity-utils',
          ),
        },
      }),
      new DefinePlugin({
        STORE_I18N_RESOURCES_PREFIX: JSON.stringify(''),
      }),
    ],
    output: {
      publicPath: 'auto',
    },
  };
};
