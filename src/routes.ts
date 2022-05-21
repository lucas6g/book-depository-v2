import { Router } from 'express'
import { Role } from './enums/Role'
import { ensureAuthenticate } from './middlewares/ensureAuthenticate'
import { authenticateUserController } from './useCases/authenticateUser/AuthenticateUserController'
import { checkUserTokenController } from './useCases/checkUserToken/CheckUserTokenController'
import { createUserController } from './useCases/createUser/CreateUserController'
import { recoverPasswordController } from './useCases/recoverPassword/RecoverPasswordController'

export const router = Router()

router.get('/', (_req, res) => res.status(200).send('Hello World!'))

router.post('/signup', createUserController.handle)

router.post('/signin', authenticateUserController.handle)

router.post('/confirmation', checkUserTokenController.handle)

router.post('/recover-password', recoverPasswordController.handle)

router.get('/protected', ensureAuthenticate(Role.ADMIN), (_req, res) =>
  res.status(200).send('Hello World!')
)
