const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')

const srcDir = path.resolve(__dirname, 'src')
const outputDir = path.resolve(__dirname, 'dist')

module.exports = {
  devtool: 'source-map',
  entry: path.join(srcDir, 'index.tsx'),
  output: {
    path: outputDir,
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new RemovePlugin({
      before: {
        log: false,
        include: [path.join(outputDir, 'js')],
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html'),
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: [/\.js$/, /\.tsx?$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
    ],
  },
  devServer: {
    static: outputDir,
    compress: true,
  },
}
