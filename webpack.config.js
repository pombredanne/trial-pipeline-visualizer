var webpack = require('webpack');
var url = require('url');

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
  devServer: {
    contentBase: '.',
    // Set up a local proxy for dashboard data, so we don't need to deal with CORS, preflight requests, etc
    proxy: {
      '/data/*': {
        target: process.env.TRIAL_DASHBOARD_ENDPOINT,
        auth: ':' + process.env.TRIAL_DASHBOARD_SECRET,
        headers: {
          // For some reason it doesn't do this for us? The server gets 'localhost:8000'
          'HOST': url.parse(process.env.TRIAL_DASHBOARD_ENDPOINT).host,
        },
        rewrite: function(req) {
          // `/data` is just our local proxy point, we don't want it in our request
          req.url = req.url.replace('/data','');
        },
        bypass: function(req, res, proxyOptions) {
          if (!process.env.TRIAL_DASHBOARD_ENDPOINT || !process.env.TRIAL_DASHBOARD_SECRET) {
            console.log('Skipping proxy because no TRIAL_DASHBOARD_ENDPOINT and TRIAL_DASHBOARD_SECRET set');
            return '/accounts.json';
          }
        }
      },
    }
  }
};