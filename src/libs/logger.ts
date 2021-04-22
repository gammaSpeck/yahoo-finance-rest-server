import { getNamespace } from 'continuation-local-storage'
import winston, { format, transports } from 'winston'
import configs from '@configs'

const { combine, timestamp, printf } = format

const logFormats = combine(
  timestamp(),
  printf((log) => {
    const NS = getNamespace(configs.cls.namespace)
    const corrId = (NS?.get(configs.cls.correlationIdField) || '') as string

    return `${log.timestamp} - <${corrId}> - [${log.level}] - ${
      log.message
    } - [DATA]:: ${JSON.stringify(log.data)}`
  })
)

const logger = winston.createLogger({
  // defaultMeta: { service: configs.serviceName }, // If you want the name to be in every log, use it
  transports: [
    new transports.Console({
      format: logFormats
    })
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // new transports.File({ filename: 'combined.log' })
  ]
})

export const log = {
  info: (message: string, data: any) => {
    logger.info({ message, data })
  },
  error: (message: string, error: any) => {
    logger.error({ message, error })
  }
}
