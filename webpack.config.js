const {resolve} = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
// require('./style.scss');
module.exports = env => {
    const {ifProd, ifNotProd} = getIfUtils(env)

    return validate({
        entry: './index.js',
        context: __dirname,
        output: {
            path: resolve(__dirname, './build'),
            filename: 'bundle.js',
            publicPath: '/build/',
            pathinfo: ifNotProd(),
        },
        devtool: ifProd('source-map', 'eval'),
        devServer: {
            port: 3002,
            historyApiFallback: true
        },
        module: {
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                {test: /\.css$/, loader: 'style-loader!css-loader'},
                {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
                {test: /(\.eot|\.woff2|\.woff|\.ttf|\.svg)/, loader: 'file-loader'},
                {
                    test: /\.(jpg|png)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 25000,
                    },
                },
                {
                    test: /\.(jpg|png)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash].[ext]',
                    },
                },
            ],
        },
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
