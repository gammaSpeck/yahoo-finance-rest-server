import { NextFunction, Request, Response } from 'express'
import AJV, { ErrorObject } from 'ajv'

import { log } from '@libs/logger'
import { RequestValidationError } from '@errors/request-validation-error'

// For complex schemas, use ajv-keywords to enhance
const ajv = new AJV({ allErrors: true, $data: true })

export interface IInputPayload {
  headers?: any
  query?: any
  params?: any
  body?: any
}

declare global {
  namespace Express {
    interface Request {
      payload?: IInputPayload
    }
  }
}

interface IMinAJVType {
  type: 'string' | 'array' | 'object' | 'boolean' | 'number' | 'integer' | 'null'
  [key: string]: any
}

interface ICommonSchema {
  type: IMinAJVType['type']
  properties: { [key: string]: IMinAJVType }
  additionalProperties?: boolean
  required?: string[]
}

export interface IValidatorInputSchema {
  headers?: ICommonSchema
  params?: ICommonSchema
  query?: ICommonSchema
  body?: ICommonSchema
}

const baseSchema = {
  type: 'object',
  properties: {},
  additionalProperties: false
}

/**
 * Refer http://json-schema.org/understanding-json-schema/UnderstandingJSONSchema.pdf to build proper schemas
 */
export const mValidateRequest = async (
  req: Request,
  _: Response,
  next: NextFunction,
  schema: IValidatorInputSchema,
  payload: IInputPayload
) => {
  log.info('Validator Validating :::', { path: req.path, schema, payload })

  const finalSchema = { ...baseSchema, required: Object.keys(schema), properties: { ...schema } }

  const isValid: boolean = await ajv.validate(finalSchema, payload)
  const valErrors = !isValid ? ajv.errors : []

  if (!isValid) throw new RequestValidationError(valErrors as ErrorObject[])

  req.payload = payload
  return next()
}
