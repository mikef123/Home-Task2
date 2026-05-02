import { Router } from 'express'
import { validateCard } from '../controllers/validate.controller'

const router = Router()

router.post('/validatecard', validateCard)

export default router
