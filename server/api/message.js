// /server/api/message.js

let storedMessage = "";

// 导出为普通函数，供 Express 使用
module.exports = (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({ message: storedMessage });
  }

  if (req.method === 'POST') {
    const { message } = req.body;
    if (typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }
    storedMessage = message;
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end();
};