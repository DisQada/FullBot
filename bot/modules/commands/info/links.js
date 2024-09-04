/** @import {CommandData, CommandFunction, Embed} from '@disqada/halfbot' */

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'links',
  description: 'The official links of the brand',
  category: 'info',
  defer: false
}

/** @type {CommandFunction} */
export function execute({ bot }) {
  /** @type {LinksObject[]} */
  const links = bot.data.links

  let description = ''
  for (const { category, urls } of links) {
    description += `### ${category}\n${urls.map(([name, value]) => `[${name}](${value})`).join(' | ')}\n`
  }

  /** @type {Embed} */
  const embed = { description }
  return { embeds: [embed] }
}

export default { data, execute }

/**
 * @typedef {object} LinksObject
 * @property {string} category the category name of the links in `urls` property
 * @property {[string, string][]} urls the properties are the names of the links and the values are the links
 */
