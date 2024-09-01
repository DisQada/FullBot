/** @import {CommandData, CommandFunction, Embed, EmbedField} from '@disqada/halfbot' */

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'commands',
  description: 'List all bot commands',
  category: 'information',
  defer: false
}

/** @type {CommandFunction} */
export function execute(interaction) {
  /** @type {Map<string, EmbedField[]>} */
  const categories = new Map()

  for (const command of interaction.bot.commands) {
    const data = command[1].data
    const category = data.category ?? '-'

    let arr = categories.get(category)
    if (!arr) arr = []

    arr.push({
      name: data.name,
      // @ts-expect-error
      value: data.description ?? ' ',
      inline: true
    })

    categories.set(category, arr)
  }

  /** @type {Embed[]} */
  const embeds = []
  for (const [title, fields] of categories) embeds.push({ title, fields })

  if (embeds.length === 0) return 'No commands available'

  return { embeds }
}

export default { data, execute }
