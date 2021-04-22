import { Request, Response, NextFunction } from 'express'

import { log } from '@libs/logger'
import { CustomError } from '@errors/custom-error'

/**
 * Error handler middleware. Use this AFTER all you other routes and middlewares are used.
 * This shall always send back a consistent looking error response.
 */
export const mErrorHandler = (err: Error, req: Request, res: Response, _: NextFunction) => {
  log.error(`\n----- : Error caught by Error Handler : -----\n`, err)

  const requestId = req.headers['x-request-id'] as string

  if (err instanceof CustomError)
    return res.status(err.statusCode).send({ requestId, errors: err.serializeErrors() })

  return res.status(500).send({ requestId, errors: [{ message: 'Something went wrong' }] })
}
