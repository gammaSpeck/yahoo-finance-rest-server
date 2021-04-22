import express, { Request, Response } from 'express'
import 'express-async-errors' // This handles all async errors seamlessly
import { json } from 'body-parser'

import { mErrorHandler } from '@middlewares/error-handler'
import { SuccessResponse } from '@libs/success-response'
import { NotFoundError } from '@errors/not-found-error'

import { allRoutes } from './routes'

const app = express()
app.use(json())

// We do this, as we use a ingress as proxy. To trust the proxy, this line is needed
// app.set('trust proxy', true)
app.use('/api', allRoutes)

app.get('/healthcheck', async (_: Request, res: Response) => {
  SuccessResponse.send({
    res,
    msg: '⚡⚡⚡ Hello ⚡⚡⚡ - Yahoo finance api wrapper is healthy 💗'
  })
})

// For all other routes, it throws a 404 error
app.all('*', async () => {
  throw new NotFoundError('Route not found')
})

app.use(mErrorHandler)

export { app }
