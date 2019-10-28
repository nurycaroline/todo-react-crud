const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodMode = process.env.NODE_ENV === 'production';
const configs = prodMode
  ? require(`${__dirname}/src/config/configProd`)
  : require(`${__dirname}/src/config/configDev`);

console.log('ENV NODE_ENV:', process.env.NODE_ENV);

const config = {
  entry: ['@babel/polyfill', 'react-hot-loader/patch', './src/index.js'],
  devtool: !prodMode ? 'source-map' : '',
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    sideEffects: false,
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(config)$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'assets/img/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: `${__dirname}/src/assets/img/${configs.LOGO}`,
      filename: 'index.html',
      title: configs.TITLE,
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
      meta: {
        'og:image': `${__dirname}/src/assets/img/${configs.LOGO}`,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './',
    hot: true,
    open: true,
    clientLogLevel: 'warning',
    stats: 'minimal',
    inline: true,
    overlay: true,
    historyApiFallback: true,
    headers: {
      'X-Custom-Header': 'yes',
      'X-Powered-By': 'Fq',
    },
  },
};

module.exports = config;
