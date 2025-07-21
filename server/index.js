const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 支持解析 JSON 请求体
app.use(express.json());

// 简单路由：代理 /api/message 到你的处理函数
const messageHandler = require('./api/message');

app.get('/api/message', messageHandler);
app.post('/api/message', messageHandler);

// 启动服务器
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

module.exports = app;