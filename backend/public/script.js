// API 基础 URL
const API_BASE_URL = '/api';

// 获取 DOM 元素
const messageElement = document.getElementById('message');
const messageInput = document.getElementById('messageInput');
const saveButton = document.getElementById('saveButton');
const statusElement = document.getElementById('status');

// 页面加载完成后获取最新消息
document.addEventListener('DOMContentLoaded', fetchLatestMessage);

// 获取最新消息
async function fetchLatestMessage() {
    try {
        messageElement.textContent = '正在加载...';
        
        const response = await fetch(`${API_BASE_URL}/messages/latest`);
        const result = await response.json();
        
        if (result.success) {
            if (result.data) {
                messageElement.textContent = result.data.content;
            } else {
                messageElement.textContent = '暂无消息';
            }
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('获取消息失败:', error);
        messageElement.textContent = '获取消息失败: ' + error.message;
    }
}

// 保存消息
async function saveMessage() {
    const content = messageInput.value.trim();
    
    // 检查输入是否为空
    if (!content) {
        showStatus('请输入要保存的内容', 'error');
        return;
    }
    
    // 禁用按钮并显示保存状态
    saveButton.disabled = true;
    saveButton.textContent = '保存中...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showStatus('保存成功!', 'success');
            messageInput.value = ''; // 清空输入框
            await fetchLatestMessage(); // 重新加载最新消息
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('保存消息失败:', error);
        showStatus('保存失败: ' + error.message, 'error');
    } finally {
        // 恢复按钮状态
        saveButton.disabled = false;
        saveButton.textContent = '保存消息';
    }
}

// 显示状态信息
function showStatus(message, type) {
    statusElement.textContent = message;
    statusElement.className = type === 'error' ? 'error' : '';
    
    // 3秒后清除状态信息
    setTimeout(() => {
        statusElement.textContent = '';
        statusElement.className = '';
    }, 3000);
}

// 绑定保存按钮点击事件
saveButton.addEventListener('click', saveMessage);