
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: "bundle.js",
    publicPath: ""
  },
  mode: "development",
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        use: ["style-loader", "css-loader"],
        test: /.(css)$/
      },
      // {
      //   use:'jsx-loader?harmony',
      //   test:  /\.jsx$/
      // },
      {
        test: /\.(eot|ttf|svg|woff|woff2|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsc", ".json"]
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: "./public/index.html"
    })
  ]
}

