const { ApplicationCommandOptionType } = require("discord.js");
const { BotCommandDeployment } = require("@disqada/halfbot");

const targetCode = "target";

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandData}
 */
const data = {
    name: "test-welcome",
    description: "Tests the welcome event on a member",
    dmPermission: false,
    defaultMemberPermissions: ["Administrator"],
    deployment: BotCommandDeployment.DevGuild,
    category: "tests",
    module: "command",
    options: [
        {
            name: targetCode,
            description: "The member to welcome",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ]
};

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandFunction}
 * @param {import("@disqada/halfbot/src/entities/command").BotCommandInteraction & import("discord.js").ChatInputCommandInteraction} interaction
 */
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
        return "No member was provided for testing";
    }

    const { findPath } = require("@disqada/pathfinder");
    const welcomeEventFilePath = findPath("guildMemberAdd");

    /** @type { import("@disqada/halfbot").BotEvent<"guildMemberAdd"> } */
    const welcomeEvent = require(welcomeEventFilePath);
    if (!welcomeEvent) {
        return "Couldn't find 'welcome event' command";
    }

    await welcomeEvent.execute(interaction.bot, target);

    /** @type { import("discord.js").InteractionReplyOptions } */
    const replyOptions = {
        content: `Welcomed ${target.user.username}`
    };

    return replyOptions;
}

module.exports = { data, execute };
