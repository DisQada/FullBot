import { ok, equal, deepEqual } from 'assert/strict'
import { data, execute } from '../../../../bot/modules/commands/info/about.js'

let bot

export default function () {
  describe('data{}', function () {
    it('should have the correct structure and values', function () {
      ok(data.module === 'command')
      ok(typeof data.name === 'string')
      // @ts-expect-error
      ok(typeof data.description === 'string')
      ok(typeof data.category === 'string')
    })
  })

  describe('execute()', function () {
    beforeEach(function () {
      bot = {
        guilds: { fetch: () => Promise.resolve({ size: 1 }) },
        application: {
          fetch: () =>
            Promise.resolve({
              name: 'TestBot',
              description: 'A test bot',
              owner: 'TestOwner',
              tags: ['test', 'bot']
            })
        },
        user: { displayAvatarURL: () => 'http://example.com/avatar.png' },
        ws: { ping: 100 }
      }
    })

    it('should return the correct embed structure', async function () {
      // @ts-expect-error
      const reply = await execute({ bot })
      ok(typeof reply === 'object')
      ok(Array.isArray(reply.embeds))
      equal(reply.embeds.length, 1)

      const embed = reply.embeds[0]
      equal(embed.title, 'TestBot')
      equal(embed.description, 'A test bot')
      deepEqual(embed.thumbnail, { url: 'http://example.com/avatar.png' })
      ok(Array.isArray(embed.fields))

      const fields = embed.fields
      deepEqual(fields[0], { name: 'Owner', value: 'TestOwner' })
      deepEqual(fields[1], {
        name: 'Built with',
        value: '[HalfBot](https://npmjs.com/package/@disqada/halfbot) JS framework'
      })
      deepEqual(fields[2], { name: 'Tags', value: 'test, bot' })
      deepEqual(fields[3], { name: 'Servers', value: 'Currently in 1 servers' })
      deepEqual(fields[4], { name: 'Ping', value: '100ms' })
    })
  })
}
