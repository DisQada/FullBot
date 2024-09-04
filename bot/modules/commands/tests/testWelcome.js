/** @import {GuildMember, InteractionReplyOptions} from 'discord.js' */
/** @import {CommandData, CommandFunction, ClientEvent} from '@disqada/halfbot' */
import { ApplicationCommandOptionType } from 'discord.js'
import { findPath } from '@disqada/pathfinder'

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

  const path = findPath({ name: 'welcome' })
  if (!path) return "Couldn't find 'welcome' event"

  /** @type {ClientEvent<'guildMemberAdd'>} */
  let welcomeEvent
  try {
    welcomeEvent = (await import(path.fullPath)).default
  } catch (err) {
    if (err.code === 'ERR_UNSUPPORTED_ESM_URL_SCHEME') {
      welcomeEvent = (await import('file://' + path.fullPath)).default
    } else throw err
  }

  if (!welcomeEvent) return 'Error loading welcome event'
  await welcomeEvent.execute(interaction.bot, target)

  /** @type {InteractionReplyOptions} */
  const replyOptions = { content: `Welcomed ${target.user.username}` }

  return replyOptions
}

export default { data, execute }
