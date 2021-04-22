/**
 * Yahoo finance docs on https://rapidapi.com/apidojo/api/yahoo-finance1?endpoint=apiendpoint_5bdfea14-a708-4492-a9c1-fe4b90cc3ffd
 */

import { Router, Request, Response, NextFunction } from 'express'
import { SuccessResponse } from '@libs/success-response'
import {
  IInputPayload,
  IValidatorInputSchema,
  mValidateRequest
} from '@middlewares/validate-request'
import { REGIONS_ALLOWED } from '@libs/constants'
import { yfAxios } from '@libs/yf-axios'

const router = Router()
const ENDPOINT = '/stock/v2/get-analysis'

const vGetStockAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  const { query } = req
  const payload: IInputPayload = { query }

  const schema: IValidatorInputSchema = {
    query: {
      type: 'object',
      properties: {
        symbol: {
          type: 'string',
          minLength: 1
        },
        region: {
          type: 'string',
          enum: REGIONS_ALLOWED
        }
      },
      required: ['symbol'],
      additionalProperties: false
    }
  }

  return mValidateRequest(req, res, next, schema, payload)
}

interface ValidQueryParams {
  symbol: string
  region?: string
}

router.get(ENDPOINT, vGetStockAnalysis, async (req: Request, res: Response) => {
  const queryParams = req.payload?.query as ValidQueryParams

  const data = await yfAxios.get(ENDPOINT, queryParams)

  SuccessResponse.send({ res, data })
})

export { router as v2GetAnalysisRoute }
