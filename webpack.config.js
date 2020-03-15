const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true // optional
            }
          }
        ]
      }
    ],
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
    pluginOptions: {
      webpackBundleAnalyzer: {
        openAnalyzer: false
      }
    }
  }