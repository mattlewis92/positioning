module.exports = {
  entry: __dirname + '/src/positioning.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: 'positioning.js',
    libraryTarget: 'umd',
    library: 'positioning'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'tslint-loader?emitErrors=true&failOnHint=true',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader?module=es2015',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  performance: {
    hints: false
  }
};
