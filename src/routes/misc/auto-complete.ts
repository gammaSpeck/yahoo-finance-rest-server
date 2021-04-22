/**
 * Yahoo finance docs on https://rapidapi.com/apidojo/api/yahoo-finance1?endpoint=5c3da178e4b0cc6cdc0ed65f
 */

import { Router, Request, Response, NextFunction } from 'express'

import {
  IInputPayload,
  IValidatorInputSchema,
  mValidateRequest
} from '@middlewares/validate-request'

import { REGIONS_ALLOWED } from '@libs/constants'
import { yfAxios } from '@libs/yf-axios'
import { SuccessResponse } from '@libs/success-response'

const router = Router()
const ENDPOINT = '/auto-complete'

const vGetAutoComplete = async (req: Request, res: Response, next: NextFunction) => {
  const { query } = req
  const payload: IInputPayload = { query }

  const schema: IValidatorInputSchema = {
    query: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          minLength: 1
        },
        region: {
          type: 'string',
          enum: REGIONS_ALLOWED
        }
      },
      required: ['q'],
      additionalProperties: false
    }
  }

  return mValidateRequest(req, res, next, schema, payload)
}

interface ValidQueryParams {
  q: string
  region?: string
}

router.get(ENDPOINT, vGetAutoComplete, async (req: Request, res: Response) => {
  const queryParams = req.payload?.query as ValidQueryParams

  const data = await yfAxios.get(ENDPOINT, queryParams)

  SuccessResponse.send({ res, data })
})

export { router as autoCompleteRoute }
