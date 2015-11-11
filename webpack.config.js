module.exports = {
  context: __dirname + "/source",
  entry: {
    javascript: "./bootstrap.js",
    html: "./index.html"
  },
  output: {
      path: __dirname + "/build",
      filename: "/bootstrap.js"
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
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
  }
};
