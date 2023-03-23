const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

const cssLoaders = (mode) => {
    const devLoades = ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    const prodLoaders = ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
    return mode === 'development' ? devLoades : prodLoaders
}

module.exports = (env) => ({
    mode: env.MODE,
    entry: path.resolve(__dirname, './src/index.tsx'),
    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, 'assets'),
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@context": path.resolve(__dirname, 'src/context'),
            "@components": path.resolve(__dirname, 'src/components'),
            "@hooks": path.resolve(__dirname, 'src/hooks'),
            "@layout": path.resolve(__dirname, 'src/layout'),
            "@mixin": path.resolve(__dirname, 'src/mixin'),
            "@store": path.resolve(__dirname, 'src/store'),
            "@views": path.resolve(__dirname, 'src/views'),
            "@models": path.resolve(__dirname, 'src/models')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: cssLoaders(env.MODE),
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    output: {
        asyncChunks: true,
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),
        new CleanWebpackPlugin(),
        new ReactRefreshWebpackPlugin(),
        new BaseHrefWebpackPlugin({
            baseHref: env.MODE === 'development' && '/'
        })
    ],
    devtool: env.MODE === 'development' ? 'cheap-module-source-map' : 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 5000
    },
    stats: 'errors-only',
})