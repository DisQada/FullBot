const { Events } = require("discord.js");
const { BotEvent } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotEventData } */
const data = {
    name: Events.GuildMemberAdd
};

/**
 * @param { import("@disqada/halfbot").DiscordBot } bot
 * @param { import("discord.js").GuildMember } member
 */
async function execute(bot, member) {
    const channelId = bot?.vars?.welcomeChannelId;
    if (!channelId) {
        throw new Error("Welcome channel id is not provided");
    }

    /** @type { import("discord.js").TextChannel } */
    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) {
        throw new Error("Couldn't find welcoming channel");
    }

    /** @type { import("discord.js").APIEmbed } */
    let embed = {
        title: "أهلا وسهلاً"
    };

    if (bot.style) {
        embed = bot.style.applyTo(embed);
    }

    /** @type { import("discord.js").MessageCreateOptions } */
    const message = {
        content: `<@${member.user.id}>`,
        embeds: [embed]
    };

    await channel.send(message);
}

module.exports = new BotEvent(data, execute);
