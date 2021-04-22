import { Response } from 'express'

import { Messages } from './constants'

type SuccessCodes = 200 | 201 | 204

interface ISuccessResponse {
  res: Response
  data?: any
  msg?: string
  code?: SuccessCodes
}

/**
 * Static class for sending back all Success responses with a data and message in the res.body
 */
export abstract class SuccessResponse {
  static send({ res, data = null, msg = Messages.Success, code = 200 }: ISuccessResponse) {
    res.status(code).send({ msg, data })
  }
}
