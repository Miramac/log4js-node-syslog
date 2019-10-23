# log4js-node-syslog

Syslog appender for [log4js-node](https://github.com/log4js-node/log4js-node). Syslog messages are send with [syslog-pro](https://github.com/cyamato/SyslogPro).

## Installation 
````
npm install log4js-node-syslog-pro --save
````

## Usage
````javascript
const log4js = require('log4js')

const testConfig = {
  address: 'localhost',
  port: 10001
}

log4js.configure({
  appenders: {
    syslog: {
      type: 'log4js-node-syslog-pro',
      // SyslogPro options: https://cyamato.github.io/SyslogPro/module-SyslogPro-RFC3164.html
      server: {
        target: 'localhost', // default
        port: 514 // default
      },
      applacationName: 'My-App',
      facility: 23, // default
      format: 'rfc3164'
    }
  },
  categories: { default: { appenders: ['syslog'], level: 'debug' } }
})
const logger = log4js.getLogger()

logger.info('My log message!')
// --> 2019-10-23 14:56:41 Local7.Debug my-hostname Oct 23 02:56:41 my-hostname My-App [DEBUG] default - My log message! 
````

## Facilities 

| Facility Number| Facility Description |
| :---: |---|
| 0 | kernel messages |
| 1 | user-level messages |
| 2 | mail system |
| 3 | system daemons |
| 4 | security/authorization messages |
| 5 | messages generated internally by syslog |
| 6 | line printer subsystem |
| 7 | network news subsystem |
| 8 | UUCP subsystem |
| 9 | clock daemon |
| 10 | System0 |
| 11 | System1 |
| 12 | System2 |
| 13 | System3 |
| 14 | System4 |
| 15 | System5 |
| 16 | local use 0 (local0) |
| 17 | local use 1 (local1) |
| 18 | local use 2 (local2) |
| 19 | local use 3 (local3) |
| 20 | local use 4 (local4) |
| 22 | local use 6 (local6) |
| 23 | local use 7 (local7) |