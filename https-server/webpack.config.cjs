const fs = require('fs')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/client/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // Add a rule to handle TypeScript files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/, // Add a rule to handle HTML files
                use: 'html-loader',
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
        noParse: [/jest\.config\.js/],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/server/ssl_certs',
                    to: 'ssl_certs'
                },
                {
                    from: '.env',
                    to: '.'
                },
            ],
        }),
    ],
};
