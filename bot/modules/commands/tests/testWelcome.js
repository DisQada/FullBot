/** @import {GuildMember, InteractionReplyOptions} from 'discord.js' */
/** @import {CommandData, CommandFunction, ClientEvent} from '@disqada/halfbot' */
import { ApplicationCommandOptionType } from 'discord.js'

const targetCode = 'target'

/** @type {CommandData} */
export const data = {
  module: 'command',
  name: 'test-welcome',
  description: 'Tests the welcome event on a member',
  category: 'tests',
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
export async function execute(interaction) {
  /** @type {GuildMember} */
  // @ts-expect-error
  const target = interaction.options.getMember(targetCode) ?? interaction.member
  if (!target) return 'No member was provided for welcoming'

  const { findPath } = require('@disqada/pathfinder')
  const welcomeEventPath = findPath({ name: 'welcome' })
  if (!welcomeEventPath) return "Couldn't find 'welcome' event"

  /** @type {ClientEvent<'guildMemberAdd'>} */
  const welcomeEvent = require(welcomeEventPath.fullPath)
  if (!welcomeEvent) return "Couldn't find 'welcome' event"

  await welcomeEvent.execute(interaction.bot, target)

  /** @type {InteractionReplyOptions} */
  const replyOptions = { content: `Welcomed ${target.user.username}` }

  return replyOptions
}

export default { data, execute }
