const https = require('https');

const botToken = '8713815031:AAEzrm-MY-Jzzh2CYJF6TzcJ4f1lF3yFEvM';
const webhookUrl = 'https://untiered-transpolar-bailey.ngrok-free.dev/api/telegram/webhook';

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

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("Response:", data);
  });
});

req.on('error', (e) => {
  console.error("Error:", e);
});

req.write(postData);
req.end();
