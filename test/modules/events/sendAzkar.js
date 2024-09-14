/** @import { MessageCreateOptions } from 'discord.js'*/
import { ok, equal } from 'assert/strict'
import { data as eData, execute } from '../../../bot/modules/events/sendAzkar.js'

let data, guilds
/** @type {MessageCreateOptions} */
let msg

export default function () {
  describe('data{}', function () {
    it('should have the correct structure and values', function () {
      ok(eData.module === 'event-repeat')
      ok(typeof eData.firstWait === 'string')
      ok(typeof eData.wait === 'string')
    })
  })

  describe('execute()', function () {
    beforeEach(function () {
      data = {
        id: { guild: { support: '1234567890' }, channel: { azkar: '0987654321' } },
        azkar: ['Azkar 1', 'Azkar 2', 'Azkar 3'],
        brand: {}
      }
      guilds = {
        fetch: () =>
          Promise.resolve({
            channels: {
              fetch: () =>
                Promise.resolve({
                  isTextBased: () => true,
                  send: (sentMsg) => Promise.resolve((msg = sentMsg))
                })
            }
          })
      }
    })

    it('should return the correct embed structure', async function () {
      // @ts-expect-error
      const reply = await execute({ data, guilds })
      equal(reply, undefined)

      equal(typeof msg, 'object')

      ok(Array.isArray(msg.embeds))
      equal(msg.embeds.length, 1)
      ok(msg.embeds[0].description.includes('Azkar'))
    })
  })
}
