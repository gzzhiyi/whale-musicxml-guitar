const {
  override,
  addWebpackExternals,
  addDecoratorsLegacy
} = require('customize-cra');
const path = require('path');

module.exports = {
  webpack: override(
    addWebpackExternals({
      'react': 'React',
      'react-dom': 'ReactDOM',
      'axios': 'axios'
    }),
    addDecoratorsLegacy()
  ),
  paths: (paths, env) => {
    paths.appBuild = path.resolve(__dirname, 'demos/dist');
    paths.appPublic = path.resolve(__dirname, 'demos/public');
    paths.appHtml = path.resolve(__dirname, 'demos/public/index.html');
    paths.appIndexJs = path.resolve(__dirname, 'demos/src/main.jsx');
    paths.appSrc = path.resolve(__dirname, 'demos');
    return paths;
  }
}
