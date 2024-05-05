const axios = require("axios");

module.exports.config = {
        name: "tempm",
        version: "1.0.1",
        role: 0,
        hasPrefix: false,
        usage: "( Gen Random Email address )",
	credits: 'Developer',
        cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {

        if (args[0] === "gen") {
                try {
                        const response = await axios.get("https://gpt4withcustommodel.onrender.com/create");
                        const responseData = response.data.email;
                        api.sendMessage(`※HERE GENERATED EMAIL※:\n\n✉️𝙴𝙼𝙰𝙸𝙻➪:${responseData}\n\n「 TEMPMAIL 」`, event.threadID);
                } catch (error) {
                        console.error("🔴 𝖤𝗋𝗋𝗈𝗋", error);
                        api.sendMessage("🔴 𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖶𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖾𝗆𝖺𝗂𝗅 𝖺𝖽𝖽𝗋𝖾𝗌𝗌...", event.threadID);
                }
        } else if (args[0].toLowerCase() === "inbox" && args.length === 2) {
                const email = args[1];
                try {
                        const response = await axios.get(`https://gpt4withcustommodel.onrender.com/mes?read=`);
  const data = response.data;

const inboxMessages = data[0].body;
const inboxFrom = data[0].from;
const inboxSubject = data[0].subject;
const inboxDate = data[0].date;
api.sendMessage(`•=====[Inbox]=====•\n👤From: ${inboxFrom}\n🔖Subject: ${inboxSubject}\n\n💌 Message: ${inboxMessages}\n🗓️Date: ${inboxDate}\n𝖢𝖨𝖢𝖨 𝖫𝖮𝖵𝖤𝖴`, event.threadID);
                } catch (error) {
                        console.error("🔴 𝖤𝗋𝗋𝗈𝗋", error);
                        api.sendMessage("🔴 Can't get any mail yet first send mail", event.threadID);
                }
        } else {
                api.sendMessage("🔴 Use 'Tempmail gen' to gen email and use Tempmail inbox {email}  to get the inbox email", event.threadID);
        }
};
