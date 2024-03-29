const express = require('express');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const app = express();

// 定义目标服务器的主机
const targetHost = 'generativelanguage.googleapis.com';

app.use(async (req, res) => {
    // 解析请求的URL
    const targetUrl = new URL(req.url, `http://${req.headers.host}`);
    targetUrl.host = targetHost;
    console.log('get request for', req.url)
    // 构建目标服务器的请求选项
    const options = {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
        path: targetUrl.pathname + targetUrl.search,
        method: req.method,
        headers: req.headers
    };

    // 发起对目标服务器的请求
    const proxyReq = (targetUrl.protocol === 'https:' ? https : http).request(options, (proxyRes) => {
        // 将目标服务器的响应转发给客户端
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, {
            end: true
        });
    });

    // 如果请求包含请求体，则传递给目标服务器
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.headers['content-length']) {
        req.pipe(proxyReq, {
            end: true
        });
    } else {
        proxyReq.end();
    }

    // 处理请求错误
    proxyReq.on('error', (err) => {
        console.error('代理请求错误:', err);
        res.status(500).send('代理请求错误');
    });
});

// 启动代理服务器
const port = 3000; // 可以修改为任何你喜欢的端口
app.listen(port, () => {
    console.log(`代理服务器运行在 http://localhost:${port}`);
});
