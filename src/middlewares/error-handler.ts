import { Request, Response, NextFunction } from 'express'

import { log } from '@libs/logger'
import { CustomError } from '@errors/custom-error'
import { getNamespace } from 'continuation-local-storage'
import configs from '@configs'

/**
 * Error handler middleware. Use this AFTER all you other routes and middlewares are used.
 * This shall always send back a consistent looking error response.
 */
export const mErrorHandler = (err: Error, __: Request, res: Response, _: NextFunction) => {
  log.error(`\n----- : Error caught by Error Handler : -----\n`, err)

  const NS = getNamespace(configs.cls.namespace)
  const requestId =
    NS?.get(configs.cls.correlationIdField) || res.get(configs.cls.correlationIdField)

  if (err instanceof CustomError)
    return res.status(err.statusCode).send({ requestId, errors: err.serializeErrors() })

  return res.status(500).send({ requestId, errors: [{ message: 'Something went wrong' }] })
}
