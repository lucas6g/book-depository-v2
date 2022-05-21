import { Router } from 'express'
import { Role } from './enums/Role'
import { ensureAuthenticate } from './middlewares/ensureAuthenticate'
import upload from './middlewares/upload'
import { addBookController } from './controllers/intitution/AddBookController'
import { registerInstitutionController } from './controllers/intitution/RegisterInstitutionController'
import { authenticateUserController } from './controllers/user/AuthenticateUserController'
import { checkUserTokenController } from './controllers/user/CheckUserTokenController'
import { createUserController } from './controllers/user/CreateUserController'
import { recoverPasswordController } from './controllers/user/RecoverPasswordController'
import { updatePasswordController } from './controllers/user/UpdatePasswordController'

export const router = Router()

router.get('/', (_req, res) => res.status(200).send('Hello World!'))

router.post('/signup', createUserController.handle)

router.post('/signin', authenticateUserController.handle)

router.post('/confirmation', checkUserTokenController.handle)

router.post('/recover-password', recoverPasswordController.handle)

router.put('/update-password', updatePasswordController.handle)

// aplication authentitated and permission

router.post(
  '/register-institution',
  ensureAuthenticate(Role.INSTITUTION_ADMIN),
  registerInstitutionController.handle
)

router.post(
  '/add-book',
  upload.single('file'),
  ensureAuthenticate(Role.INSTITUTION_ADMIN),
  addBookController.handle
)

router.get('/protected', ensureAuthenticate(Role.ADMIN), (_req, res) =>
  res.status(200).send('Hello World!')
)
