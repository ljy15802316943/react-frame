const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const webpack = require('webpack');
const proxy = require('koa-server-http-proxy');

const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const config = require('./webpack/webpack.config');

const app = new Koa();
const router = new Router();

// 配置webpack
const compiler = webpack(config);
const wdm = webpackDevMiddleware(compiler, {
  noInfo: true,
  //publicPath: config.output.publicPath
})
app.use(wdm)
app.use(webpackHotMiddleware(compiler))

// 配置静态服务。
app.use(koaStatic(path.join(__dirname, '../build')));
app.use(async (ctx, next) => {
  let html = fs.readFileSync('./build/index.html');
  ctx.body = html.toString();
  await next()
})

// 处理跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})

// 配置中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 请求代理
app.use(proxy('/api', { // 客户端发过来的请求只有前面有 api 才会进入这里，不加 api 则访问自己服务端的接口。
  target: 'http://192.168.1.105:9000', // 客户端发送的请求会被替换成这个服务端。
  pathRewrite: { '/api': '' }, // api替换为空。
  changeOrigin: true,
}))


// 启动服务
app.listen(8080, () => {
  console.log('请访问：http://localhost:8080/')
});