import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPLugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
  vendor: path.resolve(__dirname,'src/vendor'),
   main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Kulon css fajl
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash md5
    new WebpackMd5Hash(),

    // CommonChunk a bundle splithez
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),

    //Html plugin
    new HtmlWebpackPLugin({
      template:'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject:true,
      //Az itt megadott paraméterek htmlWebpackPlugin.options.varname -el elérhetőek az index.html-ben
      trackJSToken:'valami'
    }),

    //DeDupe
    new webpack.optimize.DedupePlugin(),

    //Minify
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  }
}
