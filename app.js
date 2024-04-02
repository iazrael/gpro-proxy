const express = require('express')
const {
    createProxyMiddleware
} = require('http-proxy-middleware');
const app = express()

// const HttpsProxyAgent = require('https-proxy-agent');

const proxyDomain = 'generativelanguage.googleapis.com'

app.get('/', (req, res) => {
    res.send('Hello Kitty!')
})

// // 代理服务器的地址
// const proxyHost = '127.0.0.1';
// const proxyPort = 7890;
// // 设置代理
// const proxyUrl = `http://${proxyHost}:${proxyPort}`;
// const agent = new HttpsProxyAgent(proxyUrl);

app.use('/', createProxyMiddleware({
    target: `https://${proxyDomain}`,
    changeOrigin: true,
    secure: false,
    // agent: agent,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`proxy for ${req.url}`)
        // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
        // proxyReq.headers['x-forwarded-for'] = '';
        // proxyReq.headers['x-real-ip'] = '';
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`proxy from ${req.url} back`)
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type';
        proxyRes.headers['Access-Control-Allow-Credentials'] = true;
    },
    onError: (err, req, res, target) => {
        console.log(`proxy get error for ${req.url} with target ${target}`)
        res.writeHead(500, {
            'Content-Type': 'text/plain',
        });
        res.end(`Something went wrong with ${target}`);
    }
}));


module.exports = app