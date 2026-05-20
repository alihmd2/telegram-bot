const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const TOKEN = "8684311637:AAHPKzaUICdWXvgllgz0wLFK1YRtGb0HB7I";

const bot = new TelegramBot(TOKEN, { polling: true });

async function convert(amount, to) {
  const res = await axios.get(`https://api.frankfurter.app/latest`, {
    params: {
      from: "USD",
      to: to.toUpperCase()
    }
  });

  const rate = res.data.rates[to.toUpperCase()];
  return amount * rate;
}

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  const match = text.match(/send (\d+)\s+to\s+(\w+)/);

  if (!match) {
    return bot.sendMessage(chatId, "Use: send 100 to cad");
  }

  const amount = Number(match[1]);
  const currency = match[2];

  try {
    const result = await convert(amount, currency);

    bot.sendMessage(
      chatId,
      `💱 ${amount} USD = ${result.toFixed(2)} ${currency.toUpperCase()}`
    );
  } catch (err) {
    bot.sendMessage(chatId, "Error calculating conversion.");
  }
});