var webpack = require('webpack');

module.exports = {
  entry: "./js/entry.js",
  output: {
    filename: "app.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
   ]
  },
  plugins: [
    new webpack.DefinePlugin({
      STATS_URL: JSON.stringify(process.env.STATS_URL || '/data.json')
    })
  ]
};