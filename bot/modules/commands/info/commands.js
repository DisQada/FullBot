/** @import { CommandData, CommandFunction, Embed, EmbedField } from '@disqada/halfbot' */

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'commands',
  description: 'List all bot commands',
  category: 'info',
  defer: false
}

/** @type {CommandFunction} */
export function execute({ bot }) {
  /** @type {Map<string, EmbedField[]>} */
  const catMap = new Map()

  for (const [_, { data }] of bot.commands) {
    const cat = data.category || '-'

    if (!catMap.has(cat)) catMap.set(cat, [])
    catMap.get(cat)?.push({
      name: data.name,
      // @ts-expect-error
      value: data.description || ' ',
      inline: true
    })
  }

  /** @type {Embed[]} */
  const embeds = Array.from(catMap, ([title, fields]) => ({ title, fields }))

  if (embeds.length === 0) return 'No commands available'
  return { embeds }
}

export default { data, execute }
