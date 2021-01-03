const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const templateFiles = fs.readdirSync(path.resolve(__dirname, "./src/"));

const generateHtml = () => {
    return templateFiles
      .filter((file) => file.indexOf(".hbs") > -1)
      .map((file) => {
        const name = file.split(".")[0];
        const fileName = './src/' + file;
        return new HtmlWebpackPlugin({
           title: name,
           fileName: name + ".html",
           template: fileName
        });
      })
}

module.exports = {
  entry: [
      './src/index.js',
      './src/style/index.scss'
    ],
  output: {
      path: __dirname + 'dist/build',
      filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 8080,
    watchContentBase: true,
  },
  module: {
      rules: [
        {
            test: /\.hbs$/,
            loader: "handlebars-loader",
            query: {
              helperDirs: [ path.join(__dirname, './src/helpers')],
              partialDirs: [
                path.join(__dirname, './src/components'),
              ],
              knownHelpersOnly: false,
            },
          },
          {
              test: /\.scss$/,
              loaders: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
              ]
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                query: {
                  name: '[name].[ext]',
                  outputPath: 'images/',
                },
              },
            ],
          },
      ]
  },
  plugins: [
    ...generateHtml()
  ]
};