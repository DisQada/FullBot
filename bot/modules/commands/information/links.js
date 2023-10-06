/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandData & import("discord.js").ChatInputApplicationCommandData}
 */
const data = {
    name: "links",
    description: "The official links for the application",
    category: "information",
    module: "command",
    defer: false
};

/**
 * @type {import("@disqada/halfbot/src/entities/command").BotCommandFunction}
 * @param {import("@disqada/halfbot/src/entities/command").BotCommandInteraction & import("discord.js").ChatInputCommandInteraction} interaction
 */
function execute(interaction) {
    const linkEmbeds = [];
    const links = interaction.bot.data.vars.links;

    for (let i = 0; i < links.length; i++) {
        const obj = links[i];

        /** @type {import("discord.js").APIEmbed} */
        const embed = {
            description: `${obj.description} [press here](${obj.link})`,
            author: {
                name: obj.name,
                url: obj.link,
                iconUrl: obj.iconLink
            }
        };

        linkEmbeds.push(embed);
    }

    /** @type {import("discord.js").APIEmbed} */
    const embed = {
        title: "الروابط الرسمية"
    };

    /** @type {import("discord.js").APIEmbed} */
    const embed2 = {
        description: "الأيقونات من https://icons8.com"
    };

    return { embeds: [embed, ...linkEmbeds, embed2] };
}

module.exports = { data, execute };
