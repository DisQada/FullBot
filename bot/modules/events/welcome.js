/** @import {ClientEventData, ClientEventFunction, Embed} from '@disqada/halfbot' */
import { Events } from 'discord.js'
import { applyStyle } from '@disqada/halfbot'

/** @type {ClientEventData<Events.GuildMemberAdd>} */
export const data = {
  module: 'event',
  name: Events.GuildMemberAdd
}

// @ts-expect-error
/** @type {ClientEventFunction<Events.GuildMemberAdd>} */
export async function execute({ data }, { guild, user }) {
  const channelId = data.id.channel.welcome
  if (!channelId) throw new Error('Welcome channel id is not provided')

  const channel = await guild.channels.fetch(channelId)
  if (!channel) throw new Error("Couldn't find welcoming channel")
  if (!channel.isTextBased()) throw new Error('Azkar channel is not text based')

  /** @type {Embed} */
  let embed = { description: '👋 Hello | أهلاً 👋' }

  embed = applyStyle(embed, data.brand)
  await channel.send({
    content: `<@${user.id}>`,
    embeds: [embed]
  })
}

export default { data, execute }
