import { Router } from 'express'
import authController from '../modules/auth/auth.controller.js'

const api = Router()

api.use(authController)

export default Router().use('/api/v1', api)