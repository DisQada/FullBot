/** @import {ClientApplication, Collection, OAuth2Guild} from 'discord.js' */
/** @import {CommandData, CommandFunction, Embed} from '@disqada/halfbot' */

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'about',
  description: 'General information about the bot',
  category: 'info'
}

// @ts-expect-error
/** @type {CommandFunction} */
export async function execute({ bot }) {
  /** @type {[Promise<Collection<string, OAuth2Guild>>, Promise<ClientApplication>]} */
  const promisses = [bot.guilds.fetch(), bot.application.fetch()]
  const [guilds, app] = await Promise.all(promisses)

  /** @type {Embed} */
  const embed = {
    title: app.name || '',
    description: app.description || '',
    thumbnail: { url: bot.user.displayAvatarURL() },
    fields: [
      {
        name: 'Owner',
        value: `${app.owner}`
      },
      {
        name: 'Built with',
        value: '[HalfBot](https://npmjs.com/package/@disqada/halfbot) JS framework'
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
        value: `${bot.ws.ping}ms`
      }
    ]
  }

  return { embeds: [embed] }
}

export default { data, execute }
