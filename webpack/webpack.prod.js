const { loader } = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [loader, 'css-loader', 'sass-loader']
            }
        ]
    },
}