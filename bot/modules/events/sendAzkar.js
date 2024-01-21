const { applyStyle } = require('@disqada/halfbot')

/** @type {import('@disqada/halfbot').RepeatingEventData} */
const data = {
  module: 'event-repeat',
  firstWait: '30m',
  wait: '1d'
}

/** @type {import('@disqada/halfbot').RepeatingEventFunction} */
async function execute(bot) {
  const guildId = bot.data.config.id.guild.support
  if (!guildId) {
    throw new Error('Dev guild id not found')
  }

  // @ts-expect-error
  const channelId = bot.data.id.channel.azkar
  if (!channelId) {
    throw new Error('Azkar channel id not found')
  }

  const guild = await bot.guilds.fetch(guildId)
  if (!guild) {
    throw new Error("Couldn't find dev guild")
  }

  const channel = await guild.channels.fetch(channelId)
  if (!channel) {
    throw new Error("Couldn't find azkar channel")
  }

  if (!channel.isTextBased()) {
    throw new Error('Azkar channel is not text based')
  }

  // @ts-expect-error
  const azkar = bot.data.azkar
  if (!azkar || !azkar.length) {
    throw new Error('Azkar not found')
  }

  const max = azkar.length
  const rand = Math.floor(Math.random() * max)
  /** @type {import('@disqada/halfbot').Embed} */
  let embed = {
    description: azkar[rand]
  }

  // @ts-expect-error
  embed = applyStyle(embed, bot.data.config.brand)
  await channel.send({ embeds: [embed] })
}

module.exports = { data, execute }
