/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandData}
 */
const data = {
    name: "about",
    description: "General information about the bot",
    category: "information",
    module: "command",
    defer: false
};

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandFunction}
 * @param {import("@disqada/halfbot/src/entities/command").BotCommandInteraction & import("discord.js").ChatInputCommandInteraction} interaction
 */
async function execute(interaction) {
    const { client } = interaction;

    /** @type { import("discord.js").APIEmbedField[] } */
    const fields = [
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
    ];

    /** @type { import("discord.js").APIEmbed } */
    const embed = {
        description: "This bot is for testing 'fullbot' template",
        thumbnail: { url: interaction.client.user.displayAvatarURL() },
        fields: fields
    };

    return {
        embeds: [embed]
    };
}

module.exports = { data, execute };
