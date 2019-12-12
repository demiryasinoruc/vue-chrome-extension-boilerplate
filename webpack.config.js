const path = require('path')
const webpack = require('webpack')
const fg = require('fast-glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const { version, name, description } = require('./package.json')

module.exports = (env, argv) => {
  const isDevMode = env.NODE_ENV === 'development'
  const config = {
    devtool: isDevMode ? 'eval-source-map' : false,
    context: path.resolve(__dirname, './src'),
    entry: {
      options: './options/index.js',
      popup: './popup/index.js',
      background: './background/index.js',
      'content_scripts/index': './content_scripts/index.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '.',
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            extractCSS: !isDevMode,
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.scss$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.sass$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader?indentedSyntax',
          ],
        },
        {
          test: /\.styl$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [
            isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
      ],
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
      },
      // extensions: ['.js'],
    },
    plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyWebpackPlugin([
        { from: 'assets', to: 'assets' },
        { from: 'data', to: 'data' },
        {
          from: 'manifest.json',
          to: 'manifest.json',
          transform(content, path) {
            let manifest = JSON.parse(content)
            manifest.version = version
            manifest.name = name
            manifest.description = description
            return JSON.stringify(manifest)
          },
        },
      ]),
      new HtmlWebpackPlugin({
        title: 'Options',
        template: './index.html',
        filename: 'options.html',
        chunks: ['options'],
      }),
      new HtmlWebpackPlugin({
        title: 'Popup',
        template: './index.html',
        filename: 'popup.html',
        chunks: ['popup'],
      }),
    ],
  }
  if (isDevMode) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new ExtensionReloader({
        reloadPage: true,
        entries: {
          contentScript: ['content_scripts/index'],
          background: 'background',
          extensionPage: 'popup',
          options: 'options',
        },
      })
    )
  } else {
    config.plugins.push(
      new ScriptExtHtmlWebpackPlugin({
        async: [/runtime/],
        defaultAttribute: 'defer',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new PurgecssPlugin({
        paths: fg.sync([`./src/**/*`], {
          onlyFiles: true,
          absolute: true,
        }),
      })
      // new CopyWebpackPlugin([
      //   {
      //     from: path.join(__dirname, '../src/data'),
      //     to: path.join(__dirname, '../dist/data'),
      //   },
      // ])
    )
  }
  return config
}
