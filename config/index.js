'use strict'
const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',//指的静态资源文件夹
    assetsPublicPath: '/', //发布路径
    host: 'localhost',
    port: 9002,
    // proxyTable用来配置代理API
    autoOpenBrowser: false,
    errorOverlay: true,//展示错误
    notifyOnErrors: true,//通知错误
    poll: false, // 和devserver相关的配置
    devtool: 'cheap-module-eval-source-map',
    // useEslint:false,是否使用Eslint
    cacheBusting: true,//配合devtool的配置，当给文件名插入新的hash导致清除缓存时是否生成source map
    cssSourceMap: true//是否开启cssSourceMap
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),//编译后index.html的路径
    assetsRoot: path.resolve(__dirname, '../dist'),//打包后文件的根路径
    assetsSubDirectory: 'static',//指的静态资源文件夹
    assetsPublicPath: '/', //发布路径
    productionSourceMap: true,//是否开启SourceMap
    devtool: '#source-map',//同dev
    productionGzip: false,//是否压缩
    productionGzipExtensions: ['js', 'css'],//gzip模式下需要压缩额文件拓展名
    bundleAnalyzerReport: process.env.npm_config_report,//是否开启打包后的分析报告

  }
}
