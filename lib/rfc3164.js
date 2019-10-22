'use strict'

const SyslogPro = require('syslog-pro')

// This is the function that generates an appender function
function syslogAppender (layout, timezoneOffset, config) {
  // This is the appender function itself
  return (loggingEvent) => {
    const rfc3164 = new SyslogPro.RFC3164(config)
    console.log(loggingEvent)
    const msg = layout(loggingEvent, timezoneOffset, loggingEvent.categoryName)
    // switch (loggingEvent.level.level) {
    //   case
    // }
    if (loggingEvent.level.level >= 5000) {
    //  rfc3164.debug(msg)
    } // else 
    rfc3164.log(msg)
  }
}

// stdout configure doesn't need to use findAppender, or levels
function configure (config, layouts) {
  // the default layout for the appender
  let layout = layouts.basicLayout
  // check if there is another layout specified
  if (config.layout) {
    // load the layout
    layout = layouts.layout(config.layout.type)
  }
  // create a new appender instance
  return syslogAppender(layout, config.timezoneOffset, config)
}

// export the only function needed
exports.configure = configure
