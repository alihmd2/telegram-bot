const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  try {
    const parts = text.split(" ");

    const amount = parts[0];
    const from = parts[1];
    const to = parts[2];

    const res = await axios.get(
      "https://YOUR_BACKEND_URL/convert",
      {
        params: { from, to, amount }
      }
    );

    bot.sendMessage(chatId, `Result: ${res.data.result}`);
  } catch (err) {
    bot.sendMessage(chatId, "Error calculating conversion");
  }
});
