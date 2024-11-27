const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Regra específica para arquivos CSS
                use: ['vue-style-loader', 'css-loader', 'style-loader']
            },
            {
                test: /\.scss$/, // Regra específica para arquivos SCSS
                use: ['vue-style-loader', 'css-loader', 'sass-loader', 'style-loader']
            },
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ],
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}