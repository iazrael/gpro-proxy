const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// 跨域配置
app.use(cors());

const proxyDomain = 'generativelanguage.googleapis.com'

// 代理服务器
app.use('/', createProxyMiddleware({
    target: `https://${proxyDomain}`,
    changeOrigin: true,
    secure: false, // 如果目标服务器是 https，需要设置为 false
    xfwd: true,
    pathRewrite: (path, req) => {
        // 修改路径，去掉原始请求的域名部分
        return path;
    },
    onProxyReq: (proxyReq, req, res) => {
        // 修改请求头中的 Host 字段
    },
    onProxyRes: (proxyRes, req, res) => {
        // 添加一些响应头以确保跨域
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
}));

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
