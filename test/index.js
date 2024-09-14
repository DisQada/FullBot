import about from './modules/commands/info/about.js'
import commands from './modules/commands/info/commands.js'
import help from './modules/commands/info/help.js'
import links from './modules/commands/info/links.js'
import testWelcome from './modules/commands/test/welcome.js'
import sendAzkar from './modules/events/sendAzkar.js'
import welcome from './modules/events/welcome.js'

describe('modules', function () {
  describe('commands', function () {
    describe('info', function () {
      describe('about.js', function () {
        about()
      })

      describe('commands.js', function () {
        commands()
      })

      describe('help.js', function () {
        help()
      })

      describe('links.js', function () {
        links()
      })
    })

    describe('test', function () {
      describe('welcome.js', function () {
        testWelcome()
      })
    })
  })

  describe('events', function () {
    describe('sendAzkar.js', function () {
      sendAzkar()
    })

    describe('welcome.js', function () {
      welcome()
    })
  })
})
