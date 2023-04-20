const { GatewayIntentBits } = require("discord.js");
const { DiscordBot } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").DiscordBotData } */
const botData = {
    rootDirectory: "bot"
};

/** @type { import("discord.js").ClientOptions } */
const clientOptions = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
};

new DiscordBot(botData, clientOptions);

process.on("unhandledRejection", async (err) => {
    console.error("Unhandled promise rejection:", err);
});
