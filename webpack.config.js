
module.exports = {
    entry: ['babel-polyfill', // enable async-await function
            './Client/index.js'], // assumes your entry point is the index.js in the root of your project folder
    output: {
      path: __dirname + '/Public',
      filename: 'bundle.js', // assumes your bundle.js will also be in the root of your project folder
    },
    context: __dirname,
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env','stage-2'] // if you aren't using 'babel-preset-env', then omit the 'env'
          }
        }
      ]
    },
    mode: 'development'
  };