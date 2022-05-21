import { Router } from 'express'
import { authenticateUserController } from './useCases/authenticateUser/AuthenticateUserController'
import { createUserController } from './useCases/createUser/CreateUserController'

export const router = Router()

router.get('/', (_req, res) => res.status(200).send('Hello World!'))

router.post('/signup', createUserController.handle)

router.post('/signin', authenticateUserController.handle)
