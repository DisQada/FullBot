/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandData}
 */
const data = {
    name: "commands",
    description: "List all bot commands",
    category: "information",
    module: "command"
};

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandFunction}
 * @param {import("@disqada/halfbot/src/entities/command").BotCommandInteraction & import("discord.js").ChatInputCommandInteraction} interaction
 */
async function execute(interaction) {
    const categories = {};

    for (const command of interaction.bot.commands) {
        const { data } = command[1];
        const category = data.category;

        if (!categories[category]) {
            categories[category] = [];
        }

        categories[category]?.push({
            name: data.name,
            value: data.description,
            inline: true
        });
    }

    /** @type { import("discord.js").APIEmbed[] } */
    const embeds = [];

    for (const category in categories) {
        embeds.push({
            title: category,
            fields: categories[category]
        });
    }

    if (embeds.length === 0) {
        return "No commands available";
    }

    return { embeds: embeds };
}

module.exports = { data, execute };
