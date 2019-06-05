const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new MiniCssExtractPlugin({
  filename: "[name].css"
});

const Production = true;

const SpritesmithPlugin = require('webpack-spritesmith');

let config = {
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
            minimize: true
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: Production
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                path.resolve(__dirname, "./node_modules/compass-mixins/lib")
              ]
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: "[name].[ext]"
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js'
    },
    extensions: [".ts", ".js"]
  },
  devtool: 'source-map',
  entry: ["./src/App.ts", "./scss/main.scss"],
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "./build.js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'images'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, "scss/sprite.png"),
        css: path.resolve(__dirname, "scss/sprite.scss")
      },
      apiOptions: {
        cssImageRef: "sprite.png"
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: (Production) ? '"production"' : '"development"'
      }
    }),
    extractSass
  ],
  mode: (Production) ? 'production' : 'development'
}

module.exports = config;