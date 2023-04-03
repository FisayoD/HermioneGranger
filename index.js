const telegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");

dotenv.config();
const hermioneToken = process.env.HERMIONE;

const OPENAI_API = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    apiKey: OPENAI_API,
  });
const openai = new OpenAIApi(configuration);
  

const bot = new telegramBot(hermioneToken, {
    polling: true
})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hey, I am Hermione, best friend to Harry and Ron. What would you like to ask me today?');
})

bot.on("message", async (msg) => { 
    const chatId = msg.chat.id;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: msg.text,
        temperature: 0.9,
        max_tokens: 100,
      });
      const reply = response.data.choices[0].text;
      bot.sendMessage(chatId, reply);
})


