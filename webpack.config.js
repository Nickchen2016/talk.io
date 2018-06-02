module.exports = {
    entry: './Client/index.js', // assumes your entry point is the index.js in the root of your project folder
    output: {
      path: __dirname + '/Public',
      filename: 'bundle.js' // assumes your bundle.js will also be in the root of your project folder
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        //   options: {
        //     presets: ['react', 'env','stage-2'] // if you aren't using 'babel-preset-env', then omit the 'env'
        //   }
        }
      ]
    }
  };