const https = require('https');

// 1. UPDATE THIS with your actual Vercel Domain (e.g., 'https://tripne.vercel.app')
const VERCEL_DOMAIN = 'https://tripne-platform-for-travellers.vercel.app'; 

// 2. Your Bot Token
const botToken = '8713815031:AAEzrm-MY-Jzzh2CYJF6TzcJ4f1lF3yFEvM';

const webhookUrl = `${VERCEL_DOMAIN}/api/telegram/webhook`;

const postData = JSON.stringify({
  url: webhookUrl
});

const options = {
  hostname: 'api.telegram.org',
  port: 443,
  path: `/bot${botToken}/setWebhook`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

console.log(`Setting Telegram Webhook to: ${webhookUrl}`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("Response from Telegram:", data);
    console.log("\nIf it says ok:true, you are completely set up on Vercel!");
  });
});

req.on('error', (e) => {
  console.error("Error setting webhook:", e);
});

req.write(postData);
req.end();
