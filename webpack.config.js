const path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
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
            },
        ]
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'dist/index.html'
        })
    ]
};