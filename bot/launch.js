const { DiscordBot } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").DiscordBotData } */
const botData = {
    rootDirectory: "bot"
};

new DiscordBot(botData);
