export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { name, email, message, fileUrl } = req.body;

  const botToken = process.env.TELEGRAM_BOT_TOKEN || "7920351048:AAH2_lOyN5VQP09rORjehzwMaejHYE4ySuk";
  const chatId = process.env.TELEGRAM_CHAT_ID || "-1002276690243";

  const text = `
New Submission:
👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${message}
📎 File: ${fileUrl || 'No file'}
  `;

  // For local development, just log the message and return success
  if (process.env.NODE_ENV === 'development' && !process.env.TELEGRAM_BOT_TOKEN) {
    console.log('Development mode: Would send to Telegram:', text);
    return res.status(200).json({ success: true, development: true });
  }

  const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(sendMessageUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return res.status(500).json({ error: 'Failed to send message to Telegram', details: errorData });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}
