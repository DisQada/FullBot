const { BotCommand, BotCommandDeployment } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotCommandData } */
const data = {
	name: "ping",
	description: "Replies with the bot's ping",
	deployment: BotCommandDeployment.Global,
	category: "information",
	types: {
		chatInput: true,
		contextMenu: undefined
	}
};

/** @param { import("@disqada/halfbot").BotCommandInteraction } interaction */
async function execute(interaction) {
	return `Ping: ${interaction.client.ws.ping}ms.`;
}

module.exports = new BotCommand(data, execute);
