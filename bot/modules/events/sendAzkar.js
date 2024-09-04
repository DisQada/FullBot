/** @import {RepeatingEventData, RepeatingEventFunction, Embed} from '@disqada/halfbot' */
import { applyStyle } from '@disqada/halfbot'

/** @type {RepeatingEventData} */
export const data = {
  module: 'event-repeat',
  firstWait: '30m',
  wait: '1d'
}

/** @type {RepeatingEventFunction} */
export async function execute({ data, guilds }) {
  const guildId = data.id.guild.support
  if (!guildId) throw new Error('Dev guild id not found')

  /** @type {string} */
  const channelId = data.id.channel['azkar']
  if (!channelId) throw new Error('Azkar channel id not found')

  const guild = await guilds.fetch(guildId)
  if (!guild) throw new Error("Couldn't find dev guild")

  const channel = await guild.channels.fetch(channelId)
  if (!channel) throw new Error("Couldn't find azkar channel")
  if (!channel.isTextBased()) throw new Error('Azkar channel is not text based')

  /** @type {string[]} */
  const azkar = data.azkar
  if (!azkar) throw new Error('Azkar not found')
  if (!Array.isArray(azkar)) throw new Error("Azkar isn't an array")

  const rand = Math.floor(Math.random() * azkar.length)
  /** @type {Embed} */
  let embed = { description: azkar[rand] }

  embed = applyStyle(embed, data.brand)
  await channel.send({ embeds: [embed] })
}

export default { data, execute }
