import { NextFunction, Request, Response } from 'express'
import { createNamespace } from 'continuation-local-storage'
import { nanoid } from 'nanoid'

import configs from '@configs'
import { log } from '@libs/logger'

const CLS_NS = createNamespace(configs.cls.namespace)

/**
 * Setup this middleware before all routes.
 */
export const mInitCLS = (req: Request, res: Response, next: NextFunction) => {
  const corrIdFieldName = configs.cls.correlationIdField

  const corrIdVal = nanoid(15)

  res.set('Pragma', 'no-cache')
  res.set('Cache-Control', ['no-cache', 'no-store', 'must-revalidate'])
  res.set(corrIdFieldName, corrIdVal) // Used as fallback in error handler

  CLS_NS.run(() => {
    CLS_NS.set(corrIdFieldName, corrIdVal)
    log.info('Path hit', req.url)
    next()
  })
}
