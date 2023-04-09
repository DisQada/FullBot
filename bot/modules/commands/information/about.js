const { BotCommand, BotCommandDeployment } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotCommandData } */
const data = {
	name: "about",
	description: "General information about the bot",
	deployment: BotCommandDeployment.Global,
	category: "information",
	types: {
		chatInput: true
	}
};

/**
 * @param { import("@disqada/halfbot").BotCommandInteraction } interaction
 * @returns { Promise<import("discord.js").InteractionReplyOptions | string | void> }
 */
async function execute(interaction) {
	const { client } = interaction;

	/** @type { import("discord.js").APIEmbed } */
	const embed = {
		description: "The testing bot for 'halfbot-example' code",
		thumbnail: { url: interaction.client.user.displayAvatarURL() },
		fields: [
			{
				name: "Developer",
				value: "The Alpha"
			},
			{
				name: "Programming Language",
				value: "JavaScript / TypeScript"
			},
			{
				name: "All commands",
				value: "Run the command '/commands'"
			},
			{
				name: "Servers",
				value: `Currently in ${client.guilds.cache.size} servers`
			},
			{
				name: "Ping",
				value: `${client.ws.ping}ms`
			}
		]
	};

	return {
		embeds: [embed]
	};
}

module.exports = new BotCommand(data, execute);
