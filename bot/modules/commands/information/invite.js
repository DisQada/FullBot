const { OAuth2Scopes, PermissionFlagsBits } = require("discord.js");

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandData}
 */
const data = {
    name: "invite",
    description: "Get the invite for the bot and the support server",
    category: "information",
    module: "command",
    defer: false
};

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandFunction}
 * @param {import("@disqada/halfbot/src/entities/command").BotCommandInteraction & import("discord.js").ChatInputCommandInteraction} interaction
 */
async function execute(interaction) {
    const { bot, client, guild } = interaction;

    let yes = "";

    if (client.application.botPublic) {
        const botInvite = interaction.client.generateInvite({
            scopes: [OAuth2Scopes.Bot],
            permissions: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.SendMessagesInThreads,
                PermissionFlagsBits.AddReactions,
                PermissionFlagsBits.EmbedLinks
            ]
        });

        yes += `[Invite bot to your server](${botInvite})`;
    }

    if (bot.data.config.id.guild.support) {
        await interaction.deferReply();
        const serverInvite = await guild.invites.create(guild.systemChannel, {
            maxAge: 0
        });

        if (yes !== "") {
            yes += " OR ";
        }

        yes += `[Join server](${serverInvite})`;

        if (guild.memberCount >= 1000) {
            yes += " OR ";

            const webPageUrl = `https://discord.com/servers/${guild.name}-${guild.id}`;
            yes += `[Check webpage](${webPageUrl})`;
        }
    }

    return yes ?? "No invites available";
}

module.exports = { data, execute };
