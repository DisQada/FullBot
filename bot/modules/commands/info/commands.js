/** @type {import('@disqada/halfbot').CommandData} */
const data = {
  module: 'command',
  name: 'commands',
  description: 'List all bot commands',
  category: 'information',
  defer: false
}

/** @type {import('@disqada/halfbot').CommandFunction} */
function execute(interaction) {
  /** @type {Map<string, import('@disqada/halfbot').EmbedField[]>} */
  const categories = new Map()

  for (const command of interaction.bot.commands) {
    const data = command[1].data
    const category = data.category ?? '-'

    let arr = categories.get(category)
    if (!arr) {
      arr = []
    }

    arr.push({
      name: data.name,
      // @ts-expect-error
      value: data.description ?? ' ',
      inline: true
    })

    categories.set(category, arr)
  }

  /** @type { import('@disqada/halfbot').Embed[] } */
  const embeds = []

  for (const iterator of categories) {
    embeds.push({
      title: iterator[0],
      fields: iterator[1]
    })
  }

  if (embeds.length === 0) {
    return 'No commands available'
  }

  return { embeds: embeds }
}

module.exports = { data, execute }
