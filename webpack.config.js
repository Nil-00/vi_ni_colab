const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './js/app.js',
    output: {
      path: __dirname,
      filename: 'bundle.min.js'
    },
    module: {
      loaders: [
        {
          test: /\.(svg|gif|png|eot|woff|ttf)$/,
          loaders: ['url-loader']
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        }
      ]
    },
    context: path.join(__dirname),
    plugins: [
        new CopyWebpackPlugin([
            { from: 'img',to:'img' },
            {from: '*.html'},
            {from: 'bundle.min.js'},
        ])
    ],
  };
