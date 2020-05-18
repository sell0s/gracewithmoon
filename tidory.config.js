/**
 * Tidory Configuration
 * https://tidory.com/docs/configuration/
 */
module.exports = {
  /**
   * Tistory session cookie value
   */
  ts_session: "TSSESSION",

  /**
   * Tistory blog URL
   */
  url: "https://gracewithmoon.tistory.com/",
  /**
   * Preview
   */
  preview: {
    /**
     * Preview Mode
     *
     * index
     * entry
     * category
     * tag,
     * location
     * media,
     * guestbook
     */
    mode: 'index'
  },

  /**
   * Webpack configuration extends
   */
  extends (webpackConfig) {
    webpackConfig.module.rules = [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      ...webpackConfig.module.rules
    ],
    webpackConfig.resolve = {
      extensions: [ '.tsx', '.ts', '.js', 'jsx', '.sass', 'scss' ],
      ...webpackConfig.resolve
    }
  }
}
