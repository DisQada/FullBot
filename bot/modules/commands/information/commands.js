const { BotCommand, BotCommandDeployment } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotCommandData } */
const data = {
    name: "commands",
    description: "List all bot commands",
    deployment: BotCommandDeployment.Global,
    category: "information",
    types: { chatInput: true }
};

/**
 * @param { import("@disqada/halfbot").BotCommandInteraction } interaction
 * @returns { Promise<import("discord.js").InteractionReplyOptions | string | void> }
 */
async function execute(interaction) {
    const categories = {};

    for (const command of interaction.bot.commands) {
        const { data } = command[1];

        if (!categories[data.category]) {
            categories[data.category] = [];
        }

        categories[data.category]?.push({
            name: data.name,
            value: data.description,
            inline: true
        });
    }

    const embeds = [];

    for (const category in categories) {
        /** @type { import("discord.js").APIEmbed } */
        const embed = {
            title: category,
            fields: categories[category]
        };

        embeds.push(embed);
    }

    if (embeds.length === 0) {
        return "No commands available";
    }

    return { embeds: embeds };
}

module.exports = new BotCommand(data, execute);
