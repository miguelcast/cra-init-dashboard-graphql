// const path = require('path');
const {
  override,
  addLessLoader,
  addPostcssPlugins,
  // babelInclude,
} = require('customize-cra');
// const rewireBabelLoader = require('react-app-rewire-babel-loader');

module.exports = override(
  // babelInclude([path.resolve('../package')]), // if we need a external package
  addLessLoader({
    strictMath: false,
    noIeCompat: true,
    localIdentName: '[local]--[hash:base64:5]', // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    javascriptEnabled: true,
  }),
  addPostcssPlugins([])
);
