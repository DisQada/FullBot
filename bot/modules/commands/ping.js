const { BotCommand, BotCommandDeployment } = require("halfbot");

/**
 * @type { import("easybot").BotCommandData }
 */
const data = {
	name: "ping",
	description: "Replies with the bot websocket heartbeat",
	deployment: BotCommandDeployment.Global,
	category: "information",
	types: {
		chatInput: true,
		contextMenu: undefined
	}
};

/**
 * @param { import("easybot").BotCommandInteraction } interaction
 */
async function execute(interaction) {
	return `Ping: ${interaction.client.ws.ping}ms.`;
}

module.exports = new BotCommand(data, execute);
