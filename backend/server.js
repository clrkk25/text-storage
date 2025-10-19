const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// 初始化 Supabase 客户端
const supabaseUrl = 'https://oghruvwipiivlzftzcyr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naHJ1dndpcGlpdmx6ZnR6Y3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2ODU3NTksImV4cCI6MjA3NjI2MTc1OX0.2yt6R9g23mTSTsamxK1xVnXZP9q9zpjV1ZRser4cejc';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.static('public'));

// CORS 处理
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API 路由

// 获取最新消息
app.get('/api/messages/latest', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('content')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    res.json({ success: true, data: data || null });
  } catch (error) {
    console.error('获取消息失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 保存新消息
app.post('/api/messages', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ success: false, error: '内容不能为空' });
    }
    
    const { error } = await supabase
      .from('messages')
      .insert([{ content }]);

    if (error) throw error;

    res.json({ success: true, message: '消息保存成功' });
  } catch (error) {
    console.error('保存消息失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});