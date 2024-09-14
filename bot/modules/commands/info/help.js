/** @import { Guild, Invite, Role, Collection } from 'discord.js' */
/** @import { CommandData, CommandFunction, Embed } from '@disqada/halfbot' */

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'help',
  description: 'Starter guide and the support server link',
  category: 'info'
}

// @ts-expect-error
/** @type {CommandFunction} */
export async function execute({ bot }) {
  const guildId = bot.data.id.guild.support

  if (!guildId) return 'The support server ID is not provided in the data file'
  const guild = await bot.guilds.fetch(guildId)

  /** @type {Collection<string, Invite>} */
  const invites = (await guild.invites.fetch()).filter((inv) => inv.inviter?.id === bot.user.id && inv.maxAge === 0)
  const invite = invites.first() || (await newInvite(guild))

  if (typeof invite === 'string') return invite

  /** @type {Embed[]} */
  const embeds = [
    {
      title: 'I want to build my own bot',
      description: [
        'Our tools are designed to be easy and beginner-friendly. You just need to know the basics of JavaScript and Node.js and you are good to go!',
        'All of our tools are open-source and free to use. You can find them in our [GitHub](https://github.com/DisQada) account',
        'You can learn our tools and start from scratch by reading our [documentation](https://disqada.github.io/HalfBot) or use our [template](https://github.com/DisQada/FullBot) to get started quickly'
      ].join('\n')
    },
    {
      title: 'Having a trouble?',
      description: `You can report bugs, ask questions, suggest features, and contact us in our [server](${invite.url})`
    }
  ]

  return { embeds }
}

/**
 * @param {Guild} guild
 * @returns {Promise<Invite | string>}
 */
async function newInvite(guild) {
  /** @type {Role} */ // @ts-expect-error
  const everyoneRole = guild.roles.cache.get(guild.id)

  let channelId = guild.rulesChannelId
  if (!channelId) {
    const channels = await guild.channels.fetch()
    for (const [_, channel] of channels) {
      if (!channel || !channel.isTextBased()) continue

      const permissions = channel.permissionsFor(everyoneRole)
      const isPublic = permissions.has('ViewChannel')
      if (isPublic) {
        channelId = channel.id
        break
      }
    }
  }

  if (!channelId) return 'No public channel found to create an invite'

  const invite = await guild.invites.create(channelId, {
    maxAge: 0,
    maxUses: 0
  })

  return invite
}

export default { data, execute }
