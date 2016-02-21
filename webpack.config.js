module.exports = {
  entry: "./js/entry.jsx",
  output: {
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel'
      }
   ]
  }
};