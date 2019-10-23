'use strict'
const SyslogPro = require('syslog-pro')

/**
 * Syslog appender for log4js
 * @param {Function} layout
 * @param {*} timezoneOffset
 * @param {Object} config
 */
function syslogAppender (layout, timezoneOffset, config) {
  // appender function itself
  return (loggingEvent) => {
    let syslog = null
    if (config.format && config.format.toLowerCase() === 'rfc3164') {
      syslog = new SyslogPro.RFC3164(config)
    } else if (config.format && config.format.toLowerCase() === 'rfc5424') {
      syslog = new SyslogPro.RFC5424(config)
    }
    if (syslog !== null) {
      const msg = layout(loggingEvent, timezoneOffset, loggingEvent.categoryName)
      if (loggingEvent.level.level < 20000) { // Level: Trace und Debug
        syslog.debug(msg)
      } else if (loggingEvent.level.level < 30000) { // Level: Info
        syslog.info(msg)
      } else if (loggingEvent.level.level < 40000) { // Level: Warn
        syslog.warn(msg)
      } else if (loggingEvent.level.level < 50000) { // Level: error
        syslog.error(msg)
      } else if (loggingEvent.level.level < 60000) { // Level: Fatal
        syslog.critical(msg)
      } else {
        // syslog.emergency(msg)
      }
    }
  }
}

// configure appender
function configure (config, layouts) {
  // the default layout for the appender
  let layout = layouts.layout('pattern', { pattern: '[%p] %c - %m' })
  // check if there is another layout specified
  if (config.layout) {
    // load the layout
    layout = layouts.layout(config.layout.type, config.layout)
  }
  // create a new appender instance
  return syslogAppender(layout, config.timezoneOffset, config)
}

// export the only function needed
exports.configure = configure
