const express = require('express')
const {
    createProxyMiddleware
} = require('http-proxy-middleware');

const config = require('./config')

const app = express()



// app.get('/', (req, res) => {
//     console.info('Hello')
//     res.send('Hello Kitty!')
// })



app.use('/', createProxyMiddleware({
    target: `https://${config.PROXY_TARGET_DOMAIN}`,
    changeOrigin: true,
    secure: false,
    agent: config.LOCAL_PROXY_AGENT,
    onProxyReq: (proxyReq, req, res) => {
        console.info(`[*] proxy for ${req.url}`)
        // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
        // proxyReq.headers['x-forwarded-for'] = '';
        // proxyReq.headers['x-real-ip'] = '';
    },
    onProxyRes: (proxyRes, req, res) => {
        console.info(`[*] proxy from ${req.url} back`)
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type';
        proxyRes.headers['Access-Control-Allow-Credentials'] = true;
    },
    onError: (err, req, res, target) => {
        console.error(`[!] proxy get error for ${req.url} with target ${target}, error: ${err}`)
        res.writeHead(500, {
            'Content-Type': 'text/plain',
        });
        res.end(`Something went wrong with ${target}`);
    }
}));


module.exports = app