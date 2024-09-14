/** @import {MessagePayload, MessageCreateOptions} from 'discord.js'*/
import { ok, equal } from 'assert/strict'
import { data, execute } from '../../../../bot/modules/commands/test/welcome.js'

let bot, member, options
/** @type {MessageCreateOptions} */
let msg

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
      bot = { data: { id: { channel: { welcome: '0123456789' } }, brand: {} } }
      member = {
        user: { id: 'user123', username: 'ahmad' },
        guild: {
          channels: {
            fetch: () =>
              Promise.resolve({
                isTextBased: () => true,
                send: (sentMsg) => Promise.resolve((msg = sentMsg))
              })
          }
        }
      }
      options = {
        getMember: (/** @type {string} */ targetCode) => {
          if (targetCode === 'target') return member
        }
      }
    })

    it('should return the correct embed structure', async function () {
      // @ts-expect-error
      const reply = await execute({ bot, member, options })
      console.log('📢 ------------------📢')
      console.log('📢 | reply:', reply)
      console.log('📢 ------------------📢')
      ok(typeof reply === 'object')
      equal(reply.content, `Welcomed ahmad`)

      equal(typeof msg, 'object')

      equal(msg.content, '<@user123>')

      ok(Array.isArray(msg.embeds))
      equal(msg.embeds.length, 1)
      equal(msg.embeds[0].description, '👋 Hello | أهلاً 👋')
    })
  })
}
