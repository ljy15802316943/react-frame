const { resolve, join } = require('path');

// 处理打包html文件。
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 处理css的loader。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const webpack =require('webpack');

// 添加进度条
const webpackBar = require('webpackBar');


module.exports = (env) => {
  return {
    entry: {
      main: [
        join(process.cwd(), 'src', 'index.js'),
        join(process.cwd(), 'src', 'index.html')
      ]
    },
    output: {
      filename: 'js/[name].[contenthash:5].js',
      path: resolve(__dirname, '../build'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              }
            },
            'css-loader'
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              }
            },
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name]_[contenthash:4].[ext]',
            outputPath: 'img',
            esModule: false,
          },
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            esModule: false,
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash:4].[ext]',
            outputPath: 'icon',
            esModule: false,
          },
        },
        {
          test: /\.(js|jsx)$/,
          // 只检查自己写的源代码，第三方的库是不用检查的
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  '@babel/preset-react',
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                      "corejs": {
                        "version": 3
                      },
                      "targets": {
                        "chrome": "60",
                        "firefox": "60",
                        "ie": "9",
                        "safari": "10",
                        "edge": "17"
                      }
                    },
                  ],
                ],
                plugins: [
                  "react-hot-loader/babel",
                  "@babel/plugin-transform-runtime",
                  "transform-react-jsx",
                  // 配置antd按需引入css。
                  [
                    "import",
                    {
                      "libraryName": "antd",
                      "libraryDirectory": "es",
                      "style": "css"
                    }
                  ],
                  // 编译es7语法。
                  ["@babel/plugin-proposal-decorators", { "legacy": true }],
                  ["@babel/plugin-proposal-class-properties", { "loose": false }]
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // 功能: 默认会创建一个空的HTML,自动引入打包输出的所有资源(JS/CSS)
      new HtmlWebpackPlugin({
        title: '管理输出',
        // 这里的index.html文件会作为打包build下index.html文件的模板。
        template: join(process.cwd(), 'src', 'index.html'),
        // 打包html文件名称。
        filename: "index.html",
        // 压缩html文件。
        minify: {
          // 移除空格
          collapseWhitespace: true,
          // 移除注释
          removeComments: true,
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:5].css',
        chunkFilename: 'css/[id].[contenthash:5].css',
      }),
      // react局部更新。
      new webpack.HotModuleReplacementPlugin(),
      // 添加进度条。
      new webpackBar(),
  
      // webpack全局变量。
      new webpack.DefinePlugin({
        'webpackGlobal': JSON.stringify('webpack全局变量'),
      }),
  
    ],
    //解析路径
    resolve: {
      //别名
      alias: {
        //resolve 获取绝对路径的API，join也可以获取; @ 也可以用 $,就是个 别名
        'assets': resolve(__dirname, '../src/assets'), // 设置 src的绝对路径 
        'client': resolve(__dirname, '../src/client'),
        'routes': resolve(__dirname, '../src/routes'),
        'utils': resolve(__dirname, '../src/utils'),
        'models': resolve(__dirname, '../src/models'),
      }
    },
    // 生成共享的chunk。
    optimization: {
      // Tree Shaking 移除JavaScript 上下文中的未引用代码
      usedExports: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
      // 解决：修改a文件导致b文件的contenthash变化，也是缓存失效。
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      },
      // 压缩css
      minimize: true, // 开发环境开启压缩。
      minimizer: [
        // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
        new CssMinimizerPlugin(), // 生产环境开启压缩。
      ],
    },
  }
};