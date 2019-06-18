import path from 'path'
// import CONFIG from './config/app.config'
import CleanFolder from 'clean-webpack-plugin'
import OptmizeCSS from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

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
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'static/img',
            },
          },
        ],
      },
    ],
  },
  target: 'node',
  node: {
    __dirname: false, // to fix static files in express
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
            sourceMap: environment === 'production',
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
  entry: './src/server.js', // main file to generates the bundle
  output: {
    // output settings
    path: path.resolve(__dirname, `${distPath}`), // it defines its output folder
    filename: 'server.js', // bundle name
    publicPath: '/',
  },
  plugins: [
    // define plugins used by webpack and its properties/settings
    new CleanFolder([`${distPath}/server.js`], { root: __dirname }),
  ],
}
