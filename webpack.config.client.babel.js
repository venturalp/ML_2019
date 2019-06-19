import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CleanFolder from 'clean-webpack-plugin'
import OptmizeCSS from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import CopyFiles from 'copy-webpack-plugin'

const distPath = 'deploy'
const environment = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'

export default {
  module: {
    rules: [
      {
        test: /\.jsx?$/, // regex to find files that webpack applies
        resolve: {
          extensions: ['.js', '.jsx', '.styl'], // resolves files extensiosn
        },
        exclude: /node_modules/, // avoiding node_module folders
        use: {
          loader: 'babel-loader', // using babel loader for transpiling es6 to es5
          options: {
            cacheDirectory: true, // option to transpile only modfied files
          },
        },
      },
      {
        test: /\.scss/,
        resolve: {
          extensions: ['.scss'],
        },
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: path.resolve(__dirname, `/${distPath}/css`),
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: `./${distPath}/css`,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: '/static/img',
            },
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
  devtool:
    environment === 'development'
      ? 'source-map'
      : 'false' /* testing if it's in development mode or production  (to generate soucermap file for minified js file) */,
  optimization: {
    minimizer:
      environment === 'production'
        ? [
          new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            cache: true,
            parallel: true,
            sourceMap: environment !== 'production',
            uglifyOptions: {
              output: {
                comments: false,
              },
            },
          }),
          new OptmizeCSS({}),
        ]
        : [],
  },
  entry: './src/client.js', // main file to generates the bundle
  output: {
    // output settings
    path: path.resolve(__dirname, `${distPath}`), // it defines its output folder
    filename: 'js/bundle.js', // bundle name
    publicPath: '/',
  },
  plugins: [
    // define plugins used by webpack and its properties/settings
    new CleanFolder([`${distPath}/*`], { root: __dirname }),
    // htmlPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        VARIABLE: JSON.stringify('testando'), // sending process.env varible called VARIABLE with 'testando' value
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/bundle.css',
      chunkFilename: 'css/chunk.css',
    }),
  ],
  devServer: {
    // webpack dev server settings
    contentBase: path.join(__dirname, distPath), // point to the path to run on server
    compress: true, // it defines if it should be compressed
    watchContentBase: true, // watch changes on file and re-run the application
    port: 3000, // port
    historyApiFallback: true, // it's used to fix router problemas with react-router and index.html defaull fallback https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    writeToDisk: true, // Tells devServer to write generated assets to the disk.
  },
}
