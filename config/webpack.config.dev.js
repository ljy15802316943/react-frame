const {resolve} = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) => {
  console.log(env)
  return merge(common(), {
    output: {
      // 本地服务访问路径。
      publicPath: env.TYPE === 'dev' ? '/' : '',
      // 打包前，先清除build文件。
      clean: env.TYPE === 'dev' ? false : true,
    },
    mode: 'development',
    // 解决本地热更新。
    target: env.TYPE === 'dev' ? 'web' : 'browserslist',
    devServer: {
      contentBase: resolve(__dirname, 'build'),
      // 启动gzip压缩。
      compress: true,
      //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html。
      historyApiFallback: true, 
      hot: true, //允许热加载
      host: 'localhost', // 域名。
      port: 5000, // 端口。
      // 不要显示启动服务器日志信息
      clientLogLevel: 'none',
      // 除了一些基本启动信息以外，其他内容都不要显示。
      quiet: true,
      inline: true,
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  });
} 
  