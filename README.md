# 文字存储应用 (前后端分离版本)

这是一个简单的前后端分离的文字存储应用，使用 Node.js 作为后端，HTML/JavaScript 作为前端。

## 项目结构

```
text-storage/
├── backend/              # 后端代码
│   ├── public/           # 前端静态文件
│   │   ├── index.html    # 前端页面
│   │   └── script.js     # 前端 JavaScript
│   ├── server.js         # 后端服务器
│   └── package.json      # 项目依赖
```

## 功能特性

- 前后端分离架构
- 从 Supabase 数据库读取最新消息
- 向 Supabase 数据库保存新消息
- 简单的用户界面

## 安装和运行

1. 安装后端依赖：
   ```bash
   cd backend
   npm install
   ```

2. 启动服务器：
   ```bash
   npm start
   ```

3. 在浏览器中访问 `http://localhost:3000`

## API 接口

- `GET /api/messages/latest` - 获取最新消息
- `POST /api/messages` - 保存新消息

## 技术栈

- **后端**: Node.js + Express
- **数据库**: Supabase
- **前端**: HTML + JavaScript
- **通信**: RESTful API