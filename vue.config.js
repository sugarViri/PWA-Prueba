
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/scss/main.scss'; @import '@/assets/scss/custom.scss';`
      }
    }
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            'src/assets/scss/_variables.scss',
            'src/assets/scss/base/_mixins.scss'
          ]
        })
        .end()
    })
  }
}
