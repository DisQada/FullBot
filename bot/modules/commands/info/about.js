/** @type {import('@disqada/halfbot').CommandData} */
export const data = {
  module: 'command',
  name: 'about',
  description: 'General information about the bot',
  category: 'information'
}

/** @type {import('@disqada/halfbot').CommandFunction} */
export async function execute(interaction) {
  const { client } = interaction
  const app = await interaction.client.application.fetch()
  const guilds = await client.guilds.fetch()

  /** @type {import('@disqada/halfbot').Embed} */
  const embed = {
    title: app.name || '',
    description: app.description || '',
    // 'This bot is for testing [FullBot](https://github.com/DisQada/FullBot) code template',
    thumbnail: {
      url: client.user.displayAvatarURL()
    },
    fields: [
      {
        name: 'Owner',
        value: `${app.owner}`
      },
      {
        name: 'Programming Language',
        value: 'NodeJS + JavaScript'
      },
      {
        name: 'Tags',
        value: `${app.tags.join(', ')}`
      },
      {
        name: 'Servers',
        value: `Currently in ${guilds.size} servers`
      },
      {
        name: 'Ping',
        value: `${client.ws.ping}ms`
      }
    ]
  }

  return {
    embeds: [embed]
  }
}

export default { data, execute }
