/** @import {ClientEventData, ClientEventFunction, Embed} from '@disqada/halfbot' */
import { Events } from 'discord.js'
import { applyStyle } from '@disqada/halfbot'

/** @type {ClientEventData<'guildMemberAdd'>} */
export const data = {
  module: 'event',
  name: Events.GuildMemberAdd
}

// @ts-expect-error
/** @type {ClientEventFunction<'guildMemberAdd'>} */
export async function execute(bot, member) {
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

  /** @type {Embed} */
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

export default { data, execute }
