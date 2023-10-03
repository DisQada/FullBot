const { Events } = require("discord.js");
const { applyStyle } = require("@disqada/halfbot");

/**
 * @type {import("@disqada/halfbot/src/entities/event").BotEventData}
 */
const data = {
    name: Events.GuildMemberAdd,
    module: "event"
};

/**
 * @type {import("@disqada/halfbot/src/entities/event").BotEventFunction}
 * @param {import("@disqada/halfbot").DiscordBot} bot
 * @param {import("discord.js").ClientEvents["guildMemberAdd"][0]} member
 * @returns {Promise<import("discord.js").InteractionReplyOptions>}
 */
async function execute(bot, member) {
    const channelId = bot.data.vars.welcomeChannelId;
    if (!channelId) {
        throw new Error("Welcome channel id is not provided");
    }

    /** @type { import("discord.js").TextChannel } */
    let channel = member.guild.channels.cache.get(channelId);
    if (!channel) {
        channel = member.guild.channels.fetch(channelId);
        if (!channel) {
            throw new Error("Couldn't find welcoming channel");
        }
    }

    /** @type { import("discord.js").APIEmbed } */
    let embed = {
        description: "👋 أهلا وسهلاً"
    };

    embed = applyStyle(embed, bot.data.config.brand);

    /** @type { import("discord.js").MessageCreateOptions } */
    const message = {
        content: `<@${member.user.id}>`,
        embeds: [embed]
    };

    await channel.send(message);
}

module.exports = { data, execute };
