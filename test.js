const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 解析 application/json 格式的请求体
app.use(bodyParser.json());

// 处理所有请求
app.use((req, res, next) => {
    // 构造新的请求配置
    const config = {
        method: req.method.toLowerCase(),
        maxBodyLength: Infinity,
        url: 'https://generativelanguage.googleapis.com' + req.originalUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        // 如果有请求体，则传递请求体
        data: req.body ? JSON.stringify(req.body) : undefined
    };

    // 发起新请求
    axios.request(config)
        .then((response) => {
            // 将响应返回给客户端
            res.json(response.data);
        })
        .catch((error) => {
            // 处理错误
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
