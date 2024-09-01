/** @import {Guild, Invite, Role} from 'discord.js' */
/** @import {CommandData, CommandFunction, Embed} from '@disqada/halfbot' */

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'help',
  description: 'Starter guide and the support server link',
  category: 'information'
}

// @ts-expect-error
/** @type {CommandFunction} */
export async function execute(interaction) {
  const bot = interaction.bot

  const guild = await bot.guilds.fetch(
    // @ts-expect-error
    bot.data.config.id.guild.support
  )

  const invites = await guild.invites.fetch()
  const botInvites = invites.filter(
    // @ts-expect-error
    (invite) => invite.inviter?.id === bot.user.id && invite.maxAge === 0
  )

  const invite = botInvites.first() ?? (await createNewInvite(guild))

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

  return { embeds: embeds }
}

/**
 * @param {Guild} guild
 * @returns {Promise<Invite>}
 */
async function createNewInvite(guild) {
  /** @type {Role} */
  // @ts-expect-error
  const everyoneRole = guild.roles.cache.find((r) => r.name === '@everyone')

  /** @type {string} */
  // @ts-expect-error
  let channelId = guild.rulesChannelId
  if (!channelId) {
    const channels = await guild.channels.fetch()
    for (const iterator of channels) {
      const channel = iterator[1]
      if (!channel) {
        continue
      }

      const permissions = channel.permissionsFor(everyoneRole)
      const isPublic = permissions.has('ViewChannel')
      if (isPublic) {
        channelId = channel.id
        break
      }
    }
  }

  const invite = await guild.invites.create(channelId, {
    maxAge: 0,
    maxUses: 0
  })

  return invite
}

export default { data, execute }
