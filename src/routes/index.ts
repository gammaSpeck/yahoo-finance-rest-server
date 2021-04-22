import { Router } from 'express'
import { stockRoutes } from './stock'
import { autoCompleteRoute } from './misc/auto-complete'

const router = Router()

router.use(stockRoutes)
router.use(autoCompleteRoute)

export { router as allRoutes }
