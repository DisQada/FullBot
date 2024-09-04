import { ok, equal, deepEqual } from 'assert/strict'
import { data, execute } from '../../../../bot/modules/commands/info/commands.js'

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
        commands: new Map([
          ['cmd1', { data: { name: 'cmd1', description: 'Desc 1' } }],
          ['cmd2', { data: { name: 'cmd2', description: 'Desc 2' } }]
        ])
      }
    })

    it('should return the correct embed structure', async function () {
      // @ts-expect-error
      const reply = await execute({ bot })
      ok(typeof reply === 'object')
      ok(Array.isArray(reply.embeds))
      equal(reply.embeds.length, 1)

      const embed = reply.embeds[0]
      equal(embed.title, '-')
      ok(Array.isArray(embed.fields))

      const fields = embed.fields
      deepEqual(fields[0], { name: 'cmd1', value: 'Desc 1', inline: true })
      deepEqual(fields[1], { name: 'cmd2', value: 'Desc 2', inline: true })
    })
  })
}
