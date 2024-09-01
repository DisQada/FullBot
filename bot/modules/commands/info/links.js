/** @import {CommandData, CommandFunction, Embed} from '@disqada/halfbot' */

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'links',
  description: 'The official links of the brand',
  category: 'information',
  defer: false
}

/** @type {CommandFunction} */
export function execute(interaction) {
  /** @type {LinksObject[]} */
  // @ts-expect-error
  const links = interaction.bot.data.links

  /** @type {Embed} */
  const embed = {
    description: links
      .map((obj) => `### ${obj.category}\n${obj.urls.map((url) => `[${url.name}](${url.value})`).join(' | ')}`)
      .join('\n')
  }

  return { embeds: [embed] }
}

export default { data, execute }

/**
 * @typedef {object} LinksObject
 * @property {string} category the category name of the links in `urls` property
 * @property {UrlObject[]} urls the properties are the names of the links and the values are the links
 */

/**
 * @typedef {object} UrlObject
 * @property {string} name
 * @property {string} value
 */
