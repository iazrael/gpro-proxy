const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// 跨域配置
app.use(cors());

const proxyDomain = 'generativelanguage.googleapis.com'

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use(async (req, res, next) => {
    
    // 部分代理工具，请求由浏览器发起，跨域请求时会先发送一个 preflight 进行检查，也就是 OPTIONS 请求
    // 需要响应该请求，否则后续的 POST 会失败
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS',
        'Access-Control-Allow-Headers': '*',
    };

    if (req.method === 'OPTIONS') {
        res.setHeader(...corsHeaders)
        res.end()
        return
    }
    const url = new URL(`https://${proxyDomain}${req.originalUrl}`);
    const response = await fetch(new Request(url, req));
    console.log(response)
})
// 代理服务器
// app.use('/', createProxyMiddleware({
//     target: `https://${proxyDomain}`,
//     changeOrigin: true,
//     secure: false, // 如果目标服务器是 https，需要设置为 false
//     xfwd: true,
//     pathRewrite: (path, req) => {
//         // 修改路径，去掉原始请求的域名部分
//         return path;
//     },
//     onProxyReq: (proxyReq, req, res) => {
//         // 修改请求头中的 Host 字段
//     },
//     onProxyRes: (proxyRes, req, res) => {
//         // 添加一些响应头以确保跨域
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//     }
// }));


module.exports = app