const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'Boilerplate',
  template: './public/index.html',
  filename: 'index.html'
})

const cleanWebpackPlugin = new CleanWebpackPlugin([path.resolve(__dirname, "..", 'dist')], { verbose: true, allowExternal: true })

const miniCSSExtractPlugin = new MiniCssExtractPlugin({
  filename: 'styles/styles.css',
  chunkFilename: "[id].css"
})

module.exports = {
  devtool: "source-map",
  entry: {
    bundle: ["whatwg-fetch", 'babel-polyfill', './src/index.js']
  },
  output: {
    filename: "bundle.[chunkhash:4].js",
    path: path.resolve(__dirname, "..", 'dist'),
    publicPath: "/apps/nzbs_applications/kanban_cards/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'styles/fonts/',
              publicPath: './fonts'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'styles/fonts/',
              publicPath: './fonts'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }

          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions", "ie > 9"]
              },
              sourceMap: true,
              plugins: () => [require("autoprefixer")]
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    cleanWebpackPlugin,
    htmlWebpackPlugin,
    miniCSSExtractPlugin
  ],
}