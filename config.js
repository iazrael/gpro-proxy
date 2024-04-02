
let agent = null
if (process.env.LOCAL_PROXY) {
    console.info('[*] LOCAL_PROXY enable')
    const HttpsProxyAgent = require('https-proxy-agent');
    // 代理服务器的地址
    const proxyHost = '127.0.0.1';
    const proxyPort = 7890;
    // 设置代理
    const proxyUrl = `http://${proxyHost}:${proxyPort}`;
    agent = new HttpsProxyAgent(proxyUrl);
}



module.exports = {
    PROXY_TARGET_DOMAIN: "generativelanguage.googleapis.com",
    LOCAL_PROXY_AGENT: agent,
}