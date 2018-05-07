require('babel-core/register');
const { makeWebpackConfig } = require('./config/webpack');
module.exports = makeWebpackConfig();
