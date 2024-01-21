const { Events } = require('discord.js')
const { applyStyle } = require('@disqada/halfbot')

/** @type {import('@disqada/halfbot').ClientEventData<"guildMemberAdd">} */
const data = {
  module: 'event',
  name: Events.GuildMemberAdd
}

/** @type {import('@disqada/halfbot').ClientEventFunction<"guildMemberAdd">} */
async function execute(bot, member) {
  const guild = member.guild
  if (!guild) {
    throw new Error('Guild is not available')
  }

  // @ts-expect-error
  const channelId = bot.data.id.channel.welcome
  if (!channelId) {
    throw new Error('Welcome channel id is not provided')
  }

  const channel = await guild.channels.fetch(channelId)
  if (!channel) {
    throw new Error("Couldn't find welcoming channel")
  }

  if (!channel.isTextBased()) {
    throw new Error('Azkar channel is not text based')
  }

  /** @type {import('@disqada/halfbot').Embed} */
  let embed = {
    description: '👋 Hello | أهلاً 👋'
  }

  // @ts-expect-error
  embed = applyStyle(embed, bot.data.config.brand)
  await channel.send({
    content: `<@${member.user.id}>`,
    embeds: [embed]
  })
}

module.exports = { data, execute }
