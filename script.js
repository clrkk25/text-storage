// 初始化 Supabase 客户端
const SUPABASE_URL = "https://https://jdaubdmyutkrpdyetxbz.supabase.co-project-id.supabase.co "; // ← 替换为你的 URL
const SUPABASE_ANON_KEY = "your-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkYXViZG15dXRrcnBkeWV0eGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNTk5NTAsImV4cCI6MjA2ODczNTk1MH0.rXZ4f1u3n4PvZJtWD6XMwd_74zfYaBs8DTsErozZz8M-public-key";         // ← 替换为你的 anon key

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const messageDisplay = document.getElementById("message-display");
const messageInput = document.getElementById("message-input");
const saveBtn = document.getElementById("save-btn");

// 加载最新的一条消息
async function loadMessage() {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("content")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;

    if (data && data.length > 0) {
      messageDisplay.textContent = data[0].content;
    } else {
      messageDisplay.textContent = "暂无保存的消息";
    }
  } catch (error) {
    console.error("加载失败:", error);
    messageDisplay.textContent = "加载消息失败";
  }
}

// 保存消息
async function saveMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  try {
    const { error } = await supabase
      .from("messages")
      .insert([{ content: message }]);

    if (error) throw error;

    alert("✅ 保存成功！");
    messageInput.value = "";
    loadMessage(); // 刷新显示
  } catch (error) {
    console.error("保存失败:", error);
    alert("❌ 保存失败：" + error.message);
  }
}

// 绑定事件
saveBtn.addEventListener("click", saveMessage);

// 初始化加载
loadMessage();