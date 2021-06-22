const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "static/[name].[hash].js",
  },
  devServer: {
    port: 80,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/img/favicon.png",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)/,
        loader: "file-loader",
        options: {
          name: "static/assets/img/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: "file-loader?name=static/fonts/[name].[ext]!static",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
    ],
  },
};
