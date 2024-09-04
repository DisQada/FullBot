/** @import {MessagePayload, MessageCreateOptions} from 'discord.js'*/
import { ok, equal } from 'assert/strict'
import { data as eData, execute } from '../../../bot/modules/events/welcome.js'

let data, user, guild
/** @type {MessageCreateOptions} */
let msg

export default function () {
  describe('data{}', function () {
    it('should have the correct structure and values', function () {
      ok(eData.module === 'event')
      ok(typeof eData.name === 'string')
    })
  })

  describe('execute()', function () {
    beforeEach(function () {
      data = { id: { channel: { welcome: '0123456789' } }, brand: {} }
      user = { id: 'user123' }
      guild = {
        channels: {
          fetch: () =>
            Promise.resolve({
              isTextBased: () => true,
              send: (sentMsg) => Promise.resolve((msg = sentMsg))
            })
        }
      }
    })

    it('should return the correct embed structure', async function () {
      // @ts-expect-error
      const reply = await execute({ data }, { user, guild })
      equal(reply, undefined)

      equal(typeof msg, 'object')

      equal(msg.content, '<@user123>')

      ok(Array.isArray(msg.embeds))
      equal(msg.embeds.length, 1)
      equal(msg.embeds[0].description, '👋 Hello | أهلاً 👋')
    })
  })
}
