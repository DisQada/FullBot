const { ApplicationCommandOptionType } = require("discord.js");
const {
	BotCommand,
	BotCommandDeployment,
	BotCommandContextMenuType
} = require("@disqada/halfbot");

const targetCode = "target";

/** @type { import("@disqada/halfbot").BotCommandData } */
const data = {
	name: "test-welcome",
	description: "Tests the welcome event on a member",
	dmPermission: false,
	defaultMemberPermissions: ["Administrator"],
	deployment: BotCommandDeployment.DevGuild,
	category: "tests",
	types: {
		chatInput: true,
		contextMenu: BotCommandContextMenuType.User
	},
	options: [
		{
			name: targetCode,
			description: "The member to welcome",
			type: ApplicationCommandOptionType.User,
			required: false
		}
	]
};

/** @param { import("@disqada/halfbot").BotCommandInteraction } interaction */
async function execute(interaction) {
	/** @type { import("discord.js").GuildMember } */
	let target;
	if (interaction.targetMember) {
		target = interaction.targetMember;
	} else {
		target =
			interaction.options.getMember(targetCode) ?? interaction.member;
	}

	if (!target) {
		throw new Error("No member was provided for testing");
	}

	const { getFilePath } = require("paths-manager");
	const welcomeEventFilePath = getFilePath("guildMemberAdd.js");

	/** @type { import("@disqada/halfbot").BotEvent } */
	const welcomeEvent = require(welcomeEventFilePath);

	welcomeEvent.execute(interaction.bot, target);

	/** @type { import("discord.js").InteractionReplyOptions } */
	const replyOptions = {
		content: `Welcomed ${target.user.username}`,
		ephemeral: true
	};

	return replyOptions;
}

module.exports = new BotCommand(data, execute);
