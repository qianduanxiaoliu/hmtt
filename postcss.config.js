// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      // 代表设置那些样式使用postcss pxtorem这个插件
      propList: ['*']
      // 也可以使用下面的方法
      // exclude:['ithub-markdown-css']
    }
  }
}
