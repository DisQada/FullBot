const { DiscordBot } = require("halfbot");
require("dotenv").config();

const botStyle = require("./config/style");

const bot = new DiscordBot({
	token: process.env.botToken,
	clientId: process.env.clientId,
	style: botStyle
});

module.exports = bot;
