import { ok, equal } from 'assert/strict'
import { data, execute } from '../../../../bot/modules/commands/info/links.js'

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
      const links = [
        {
          category: 'Main',
          urls: [
            ['Website', 'https://disqada.org'],
            ['GitHub', 'https://github.com/DisQada']
          ]
        },
        {
          category: 'Community',
          urls: [
            ['Discord', 'https://discord.gg/2ncvy3spHY'],
            ['Reddit', 'https://reddit.com/r/DisQada']
          ]
        },
        {
          category: 'Social Media',
          urls: [
            ['LinkedIn', 'https://linkedin.com/company/DisQada'],
            ['X (Twitter)', 'https://x.com/DisQada']
          ]
        }
      ]
      bot = { data: { links } }
    })

    it('should return the correct embed structure', async function () {
      // @ts-expect-error
      const reply = await execute({ bot })
      ok(typeof reply === 'object')
      ok(Array.isArray(reply.embeds))
      equal(reply.embeds.length, 1)

      const embed = reply.embeds[0]
      ok(embed.description.includes('### Main'))
      ok(embed.description.includes('[Website](https://disqada.org)'))
      ok(embed.description.includes('[GitHub](https://github.com/DisQada)'))
      ok(embed.description.includes('### Community'))
      ok(embed.description.includes('[Discord](https://discord.gg/2ncvy3spHY)'))
      ok(embed.description.includes('[Reddit](https://reddit.com/r/DisQada)'))
      ok(embed.description.includes('### Social Media'))
      ok(embed.description.includes('[LinkedIn](https://linkedin.com/company/DisQada)'))
      ok(embed.description.includes('[X (Twitter)](https://x.com/DisQada)'))
    })
  })
}
