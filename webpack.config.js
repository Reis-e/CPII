const path = require('path')

module.exports = { //5:00
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
  devtool: 'eval-source-map',
  watch: true,
}