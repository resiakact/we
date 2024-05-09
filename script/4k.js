const axios = require('axios');
const tinyurl = require('tinyurl');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "4k",
    aliases: ["upscale"],
    version: "1.0",
    author: "ArYAN",
    hasPrefix: false,
    countDown: 10,
    role: 0,
    longDescription: {
      en: "Upscale your image.",
    },
    category: "media",
    guide: {
      en: "{pn} reply to an image"
    }
  },

  onStart: async function ({ message, args, event, api }) {
    let imageUrl;

    if (event.type === "message_reply") {
      const replyAttachment = event.messageReply.attachments[0];

      if (["photo", "sticker"].includes(replyAttachment?.type)) {
        imageUrl = replyAttachment.url;
      } else {
        return api.sendMessage(
          { body: `⛔ Please reply to an image.` },
          event.threadID
        );
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return api.sendMessage(
        { body: `⛔ Please reply to an image or provide a valid image URL.` },
        event.threadID
      );
    }

    try {
      const url = await tinyurl.shorten(imageUrl);
      const response = await axios.get(`https://aryan-apis.onrender.com/api/4k?url=${url}&apikey=aryan`);

      message.reply("𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍..........");

      const resultUrl = response.data.resultUrl;

      const imageData = await global.utils.getStreamFromURL(resultUrl);

      message.reply({ body: `🖼️ 𝗨𝗣𝗦𝗖𝗔𝗟𝗘𝗗`, attachment: imageData });
    } catch (error) {
      message.reply(`⛔ Invalid response from API. ${error.message} please contact the developer.`);
    }
  }
};
