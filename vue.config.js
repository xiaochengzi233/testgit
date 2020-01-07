const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 项目的主要配置文件
module.exports = {
  // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
  chainWebpack: (config)=>{
    //修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('static', resolve('public/static'))
      .set('assets', resolve('src/assets'))
      .set('network', resolve('src/network'))
      .set('public', resolve('src/public'))
      .set('views', resolve('src/views'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
  },
}