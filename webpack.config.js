const path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');
const { Template } = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module : {
        rules : [
            {
              test : /\.(js)$/, 
              use:'babel-loader'
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: 'style-loader'
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localsConvention: 'camelCase',
                    sourceMap: true
                  }
                }
              ]
            },{
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                  }
                }
              ]
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : './src/index.html'
        })
    ]
};