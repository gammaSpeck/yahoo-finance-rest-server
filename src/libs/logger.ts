import winston, { format, transports } from 'winston'

const logFormats = [format.json()]

export const log = winston.createLogger({
  level: 'info',
  format: format.combine(...logFormats),
  // defaultMeta: { service: configs.serviceName }, // If you want the name to be in every log, use it
  transports: [
    new transports.Console({
      format: format.simple()
    })
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // new transports.File({ filename: 'combined.log' })
  ]
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   log.add(
//     new transports.Console({
//       format: format.combine(format.simple(), format.colorize())
//     })
//   )
// }
