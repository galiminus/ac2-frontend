envify = require('envify/custom')
webpack = require("webpack")

module.exports = {
  context: __dirname + "/source",
  entry: {
    javascript: "./application.js",
    html: "./index.html"
  },
  output: {
      path: __dirname + "/build",
      filename: "/application.js"
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'source', 'source/images'],
    fallback: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass!"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.coffee$/,
        exclude: /node_modules/,
        loaders: ['coffee', 'cjsx']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
