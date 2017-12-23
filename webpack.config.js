module.exports = {
    entry: './site/js/app.js',
    output: {
      path: __dirname+'/site',
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
  };
