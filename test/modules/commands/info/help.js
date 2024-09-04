import { ok, equal } from 'assert/strict'
import { Collection } from 'discord.js'
import { data, execute } from '../../../../bot/modules/commands/info/help.js'

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
        user: { id: 'botId' },
        data: { id: { guild: { support: '0123456789' } } },
        guilds: {
          fetch: () =>
            Promise.resolve({
              rulesChannelId: 'rulesChannelId',
              channels: {
                fetch: () =>
                  Promise.resolve(new Map([['rulesChannelId', { permissionsFor: () => ({ has: () => true }) }]]))
              },
              invites: {
                create: () => Promise.resolve({ url: 'http://example.com/invite' }),
                fetch: () =>
                  Promise.resolve(
                    new Collection([
                      ['invite1', { inviter: { id: 'botId' }, maxAge: 0, url: 'http://example.com/invite' }]
                    ])
                  )
              }
            })
        }
      }
    })

    it('should return the correct embed structure', async function () {
      // @ts-expect-error
      const reply = await execute({ bot })
      ok(typeof reply === 'object')
      ok(Array.isArray(reply.embeds))
      equal(reply.embeds.length, 2)

      const embed1 = reply.embeds[0]
      equal(embed1.title, 'I want to build my own bot')
      ok(embed1.description.includes('Our tools are designed to be easy and beginner-friendly.'))
      ok(embed1.description.includes('All of our tools are open-source and free to use.'))
      ok(
        embed1.description.includes(
          'You can learn our tools and start from scratch by reading our [documentation](https://disqada.github.io/HalfBot)'
        )
      )

      const embed2 = reply.embeds[1]
      equal(embed2.title, 'Having a trouble?')
      ok(
        embed2.description.includes(
          'You can report bugs, ask questions, suggest features, and contact us in our [server](http://example.com/invite)'
        )
      )
    })
  })
}
