const path = require('path');
const webpack = require('webpack');
const productionGzipExtensions = ['js', 'css']
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/' : '/',
    productionSourceMap: false,
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8880,
        // 设置代理
        proxy: {
            '/mapi': {
                // 目标 API 地址
                target: 'https://c.m.163.com/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/mapi': ''
                }
            },
            '/napi': {
                // 目标 API 地址
                target: 'https://ent.163.com/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/napi': ''
                }
            },
            '/capi': {
                // 目标 API 地址
                target: 'https://comment.api.163.com',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/capi': ''
                }
            },

        }
    },
    configureWebpack: {
        plugins: [
            // 配置compression-webpack-plugin压缩
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },
    chainWebpack: config => {
        // 引入babel-polyfill
        config
            .entry('index')
            .add('babel-polyfill')
            .end();
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/style/var.scss";`
            }
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = '新冠疫情';
            return args;
        })
    }
}