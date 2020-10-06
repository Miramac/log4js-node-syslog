const dgram = require('dgram')
const tap = require('tap')
const log4js = require('log4js')

const testConfig = {
  address: 'localhost',
  port: 10001
}

log4js.configure({
  appenders: {
    syslog: {
      type: '..',
      server: {
        target: testConfig.address,
        port: testConfig.port
      },
      applacationName: 'App-Name',
      facility: 23,
      format: 'rfc3164'
    }
  },
  categories: { default: { appenders: ['syslog'], level: 'trace' } }
})
const logger = log4js.getLogger('Category-Name')

tap.beforeEach((done, t) => {
  t.context.udpServer = dgram.createSocket('udp6')
  t.context.udpServer.bind(testConfig)
  done()
})

tap.afterEach((done, t) => {
  t.context.udpServer.close()
  done()
})

tap.test('send and get a debug log', t => {
  const udpServer = t.context.udpServer
  logger.debug('Test debug message')
  udpServer.on('message', (msg, rinfo) => {
    t.match(msg.toString(), /<191>.* App-Name \[DEBUG\] Category-Name - Test debug message/)
    t.end()
  })
})
