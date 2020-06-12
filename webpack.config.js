
module.exports = {
    entry: ['./Client/index.js'], // assumes your entry point is the index.js in the root of your project folder
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
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }
      ]
    },
    mode: 'development'
  };