var webpack = require('webpack');

module.exports = {
  entry: "./src/entry.js",
  output: {
    filename: "app.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loaders: ['style','css']
      }
   ]
  },
  plugins: [
    new webpack.DefinePlugin({
      STATS_URL: JSON.stringify(process.env.STATS_URL || '/data.json')
    })
  ]
};