import { ApplicationCommandOptionType } from 'discord.js'

const targetCode = 'target'

/** @type {import('@disqada/halfbot').CommandData} */
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

/** @type {import('@disqada/halfbot').CommandFunction} */
export async function execute(interaction) {
  // @ts-expect-error
  const target = interaction.options.getMember(targetCode) ?? interaction.member
  if (!target) {
    return 'No member was provided for welcoming'
  }

  const { findPath } = require('@disqada/pathfinder')
  const welcomeEventPath = findPath({ name: 'welcome' })
  if (!welcomeEventPath) {
    return "Couldn't find 'welcome' event"
  }

  /** @type {import('@disqada/halfbot').ClientEvent<"guildMemberAdd">} */
  const welcomeEvent = require(welcomeEventPath.fullPath)
  if (!welcomeEvent) {
    return "Couldn't find 'welcome' event"
  }

  await welcomeEvent.execute(interaction.bot, target)

  /** @type { import('discord.js').InteractionReplyOptions } */
  const replyOptions = {
    content: `Welcomed ${target.user.username}`
  }

  return replyOptions
}

export default { data, execute }
