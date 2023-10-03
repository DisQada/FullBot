const { GatewayIntentBits } = require("discord.js");
const { DiscordBot } = require("@disqada/halfbot");
require("dotenv").config();

/**
 * @type {import("@disqada/halfbot").DiscordBotData}
 */
const botData = {
    token: process.env.TOKEN,
    rootDirectory: "bot",
    dataDirectory: "bot/data"
};

/**
 * @type {import("discord.js").ClientOptions}
 */
const clientOptions = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
};

new DiscordBot(botData, clientOptions);

process.on("unhandledRejection", async (err) => {
    console.error("Unhandled rejection:", err);
});
