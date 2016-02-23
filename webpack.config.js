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
      '/dashboard/trials/*': {
        target: process.env.TRIAL_DASHBOARD_HOST,
        headers: {
          'HOST': url.parse(process.env.TRIAL_DASHBOARD_HOST).host,
          'X-TRIAL-DASHBOARD-SECRET': process.env.TRIAL_DASHBOARD_SECRET
        },
        bypass: function(req, res, proxyOptions) {
          if (!process.env.TRIAL_DASHBOARD_HOST || !process.env.TRIAL_DASHBOARD_SECRET) {
            console.log('Skipping proxy because no TRIAL_DASHBOARD_HOST and TRIAL_DASHBOARD_SECRET set');
            return '/accounts.json';
          }
        }
      },
    }
  }
};