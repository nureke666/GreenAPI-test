const apiUrl = "https://api.green-api.com";

// Вспомогательная функция для вывода ответа
function displayResponse(data) {
    document.getElementById('responseArea').value = JSON.stringify(data, null, 4);
}

// Получение учетных данных
function getCredentials() {
    const idInstance = document.getElementById('idInstance').value.trim();
    const apiTokenInstance = document.getElementById('ApiTokenInstance').value.trim();
    if (!idInstance || !apiTokenInstance) {
        alert('Пожалуйста, введите idInstance и ApiTokenInstance');
        throw new Error('Missing credentials');
    }
    return { idInstance, apiTokenInstance };
}

// Форматирование номера телефона
function getChatId(phone) {
    phone = phone.trim();
    if (!phone.endsWith('@c.us')) phone += '@c.us';
    return phone;
}

// Методы API
async function getSettings() {
    try {
        const { idInstance, apiTokenInstance } = getCredentials();
        const response = await fetch(`${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`);
        displayResponse(await response.json());
    } catch (error) {
        displayResponse({ error: error.message });
    }
}

async function getStateInstance() {
    try {
        const { idInstance, apiTokenInstance } = getCredentials();
        const response = await fetch(`${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);
        displayResponse(await response.json());
    } catch (error) {
        displayResponse({ error: error.message });
    }
}

async function sendMessage() {
    try {
        const { idInstance, apiTokenInstance } = getCredentials();
        const phone = document.getElementById('phoneMessage').value;
        const message = document.getElementById('textMessage').value;

        if (!phone || !message) return alert('Введите номер телефона и сообщение');

        const payload = { chatId: getChatId(phone), message };
        const response = await fetch(`${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        displayResponse(await response.json());
    } catch (error) {
        displayResponse({ error: error.message });
    }
}

async function sendFileByUrl() {
    try {
        const { idInstance, apiTokenInstance } = getCredentials();
        const phone = document.getElementById('phoneFile').value;
        const fileUrl = document.getElementById('fileUrl').value;

        if (!phone || !fileUrl) return alert('Введите номер телефона и ссылку на файл');

        const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1) || 'file';
        const payload = { chatId: getChatId(phone), urlFile: fileUrl, fileName };

        const response = await fetch(`${apiUrl}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        displayResponse(await response.json());
    } catch (error) {
        displayResponse({ error: error.message });
    }
}