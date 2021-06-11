const config = require('../../config/webpack.common')();

// webpack配置
config.mode = 'development'; // 指定开发环境。
config.output.clean = true; // 打包前清空旧的打包文件。
config.plugins[0].userOptions.minify = {
  collapseWhitespace: false, // 移除空格
  removeComments: false, // 移除注释
}
config.plugins[0].template = '../../index.html'; // html模板。

module.exports = config;