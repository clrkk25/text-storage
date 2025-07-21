// 🔥 替换为你自己的 Vercel 部署域名！
const API_URL = "https://text-storage-server.vercel.app "; // ← 修改这里！

const messageDisplay = document.getElementById("message-display");
const messageInput = document.getElementById("message-input");
const saveBtn = document.getElementById("save-btn");

// 加载消息
async function loadMessage() {
  try {
    const response = await fetch(`${API_URL}/api/message`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    messageDisplay.textContent = data.message || "暂无保存的消息";
  } catch (error) {
    console.error("加载失败:", error);
    messageDisplay.textContent = "❌ 加载消息失败，请刷新重试。";
  }
}

// 保存消息
async function saveMessage() {
  const message = messageInput.value.trim();
  if (!message) {
    alert("请输入内容！");
    return;
  }

  // 防重复点击
  saveBtn.disabled = true;
  saveBtn.textContent = "⏳ 保存中...";

  try {
    const response = await fetch(`${API_URL}/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      alert("✅ 保存成功！");
      messageInput.value = "";
      loadMessage(); // 实时更新显示
    } else {
      const err = await response.json().catch(() => ({}));
      alert("❌ 保存失败：" + (err.error || "未知错误"));
    }
  } catch (error) {
    console.error("请求异常:", error);
    alert("网络错误，请检查控制台");
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "💾 保存";
  }
}

// 绑定事件
saveBtn.addEventListener("click", saveMessage);

// 初始化
loadMessage();