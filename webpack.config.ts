export default {
  mode: 'none',
  entry: __dirname + '/src/entry.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: 'positioning.js',
    libraryTarget: 'umd',
    library: 'positioning',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: /node_modules/,
      enforce: 'pre',
      options: {
        emitErrors: true,
        failOnHint: true
      }
    }, {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        compilerOptions: {
          module: 'es2015',
          declaration: false
        }
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
