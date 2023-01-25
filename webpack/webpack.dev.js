const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin')

console.log(path.resolve(__dirname, 'assets'))
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 5000
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new BaseHrefWebpackPlugin({
            baseHref: '/'
        })
    ],
}