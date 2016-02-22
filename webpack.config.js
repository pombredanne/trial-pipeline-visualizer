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
  }
};