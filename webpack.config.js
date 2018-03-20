const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('./public/css/style.min.css');

module.exports = {
  entry: "./app/components/App.jsx",
  plugins: [
    extractSass,
  ],
  output: {
    filename: "public/scripts/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test:/\.(s*)css$/,
        include: /node_modules/,
        use: extractSass.extract({
          use: [{
            // loader: 'css-loader?minimize',
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
          }]
        })
      },
      {
        test: [/\.eot$/, /\.png$/, /\.jpg$/, /\.gif$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'url-loader'
        // output: './dist/public/css'
      },
    ]
  }
};
