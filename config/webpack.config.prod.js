const {resolve, join} = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = (env) => {
  // 获取传过来的环境变量。
  return merge(common(), {
    mode: 'production',
    devtool: 'source-map',
    target: 'browserslist',
    output: {
      // 打包前，先清除build文件。
      clean: true,
    },
  });
} 
  