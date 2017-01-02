const BabiliPlugin = require('babili-webpack-plugin')

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new BabiliPlugin()
  ]
}