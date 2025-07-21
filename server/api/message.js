// 使用模块化语法 (ESM)
export default async function handler(req, res) {
  // 模拟持久化存储（实际应使用数据库）
  // 当前仅用闭包变量保存，适用于演示
  if (!global.storedMessage) {
    global.storedMessage = "";
  }

  if (req.method === "GET") {
    return res.status(200).json({ message: global.storedMessage });
  } else if (req.method === "POST") {
    const { message } = req.body;
    if (typeof message !== 'string') {
      return res.status(400).json({ error: "无效的消息格式" });
    }
    global.storedMessage = message;
    return res.status(200).json({ success: true });
  } else {
    return res.setHeader("Allow", ["GET", "POST"]).status(405).end();
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};