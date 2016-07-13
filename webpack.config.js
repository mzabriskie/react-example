const {resolve} = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');

module.exports = env => {
  const valueIf = (add, value, alternate) => add ? value : alternate;
  const ifProd = (value, alternate) => valueIf(env.prod, value, alternate);
  const ifTest = (value, alternate) => valueIf(env.test, value, alternate);
  const removeEmpty = array => array.filter(i => !!i);

  return validate({
    entry: './index.js',
    context: __dirname,
    output: {
      path: resolve(__dirname, './build'),
      filename: 'bundle.js'
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      noParse: ifTest([/node_modules\/sinon\//]),
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /(\.eot|\.woff2|\.woff|\.ttf|\.svg)/, loader: 'file-loader' }
      ]
    },
    resolve: ifTest({alias: {sinon: 'sinon/pkg/sinon'}}),
    externals: ifTest({
      jsdom: 'window',
      cheerio: 'window',
      'react/lib/ExecutionEnvironment': true,
    }),
    plugins: removeEmpty([
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true, // eslint-disable-line
          warnings: false,
        },
      })),
    ])
  });
};
