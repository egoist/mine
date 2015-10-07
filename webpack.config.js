var vue = require('vue-loader')
var path = require('path')
var nib = require('nib')

module.exports = {
  entry: ["./src/main.js"],
  output: {
    path: path.resolve("./build"),
    filename: "bundle.js",
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: vue.withLoaders({
          // apply babel transform to all javascript
          // inside *.vue files.
          js: 'babel?optional[]=runtime&stage=0',
          css: 'stylus'
        })
      },
      {
        test: /\.js$/,
        loaders: ['babel?stage=0']
      }
    ]
  },
  plugins: [],
  stylus: {
    use: [nib()]
  }
  
}