import { Router } from 'express'
import { v2GetAnalysisRoute } from './v2/get-analysis'

const router = Router()

router.use(v2GetAnalysisRoute)

export { router as stockRoutes }
