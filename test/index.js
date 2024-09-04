import about from './modules/commands/info/about.js'
import commands from './modules/commands/info/commands.js'
import help from './modules/commands/info/help.js'
import links from './modules/commands/info/links.js'
import sendAzkar from './modules/events/sendAzkar.js'
import welcome from './modules/events/welcome.js'

describe('modules', function () {
  describe('commands', function () {
    describe('info', function () {
      describe('about', function () {
        about()
      })

      describe('commands', function () {
        commands()
      })

      describe('help', function () {
        help()
      })

      describe('links', function () {
        links()
      })
    })
  })

  describe('events', function () {
    describe('sendAzkar', function () {
      sendAzkar()
    })

    describe('welcome', function () {
      welcome()
    })
  })
})
