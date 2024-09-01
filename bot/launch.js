import { GatewayIntentBits } from 'discord.js'
import { DiscordBot } from '@disqada/halfbot'
import { config } from 'dotenv'
config()

const bot = new DiscordBot({
  token: process.env.TOKEN || '',
  directories: {
    root: 'bot',
    data: 'data'
  },
  client: {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
  }
})

bot.on('ready', async () => process.on('unhandledRejection', logRejection))

/**
 * Logs an unhandled rejection error and sends a message to the error channel.
 * @param {Error} err - The unhandled rejection error.
 * @returns {Promise<void>} - A promise that resolves when the error is logged and the message is sent.
 * @async
 */
async function logRejection(err) {
  console.error('Unhandled rejection:', err)

  try {
    const guildId = bot.data.config.id.guild.dev
    // @ts-expect-error
    const channelId = bot.data.id.channel.errors

    if (!guildId || !channelId) return

    let msg = `# ${err.message}`
    if (err.stack) msg += `\n${err.stack}`

    const guild = await bot.guilds.fetch(guildId)
    const channel = await guild.channels.fetch(channelId)
    if (channel && channel.isTextBased()) channel.send({ content: msg })
  } catch (err) {
    console.error('err:', err)
  }
}
