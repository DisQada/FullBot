/** @import { CommandData, CommandFunction } from '@disqada/halfbot' */
import { ApplicationCommandOptionType } from 'discord.js'
import { execute as welcome } from '../../events/welcome.js'

const targetCode = 'target'

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'test-welcome',
  description: 'Tests the welcome event on a member',
  category: 'test',
  deployment: 'dev',
  dmPermission: false,
  options: [
    {
      name: targetCode,
      description: 'The member to welcome',
      type: ApplicationCommandOptionType.User
    }
  ]
}

// @ts-expect-error
/** @type {CommandFunction} */
export async function execute({ bot, member, options }) {
  const target = options.getMember(targetCode) || member
  if (!target) return 'No member was provided for welcoming'
  if (!('user' in target)) return 'Invalid member provided for welcoming'

  await welcome(bot, target)
  return { content: `Welcomed ${target.user.username}` }
}

export default { data, execute }
