const fetch = require("node-fetch");

exports.handler = async function (event) {
  const body = JSON.parse(event.body);

  const message = `
🚚 New Moving Request:
👤 Name: ${body.name}
📞 Phone: ${body.phone}
📅 Date: ${body.date}
📍 Address: ${body.address}
📝 Message: ${body.message || "—"}
`;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_IDS = [
    process.env.TELEGRAM_CHAT_ID_Ilya,
    process.env.TELEGRAM_CHAT_ID_Vadim
  ];

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await Promise.all(CHAT_IDS.map(chat_id =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        text: message
      })
    })
  ));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
