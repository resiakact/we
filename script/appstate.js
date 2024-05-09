const axios = require('axios');

module.exports = {
  eurix: {
    name: "appstate",
    author: "Eugene Aguilar",
    hasPrefix: false,
    description: "Get appstate from facebook",
    category: "gen",
  },
  execute: async function ({ bot, chatId, args }) {
    try {
      const content = args.join(" ").split("|").map((item) => item.trim());

      let email = content[0];
      let password = content[1];

      if (!email || !password) {
        await bot.sendMessage(chatId, `Wrong format\n\nUse: ${global.config.prefix} appstate <email>|<password>`);
        return;
      }

      const res = await axios.get(`https://eurix-api.replit.app/appstate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      const data = res.data.result;

      const formattedData = data.map(item => ({
        "key": item.key,
        "value": item.value,
        "domain": item.domain,
        "path": item.path,
        "hostOnly": item.hostOnly,
        "creation": item.creation,
        "lastAccessed": item.lastAccessed
      }));

      await bot.sendMessage(chatId, `${JSON.stringify(formattedData, null, 2)}`);
    } catch (error) {
      console.error(error);
      await bot.sendMessage(chatId, `${error}`);
    }
  }
};
