import { Request, Response } from 'express'
import { authenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    if (!email) return res.status(400).send({ message: 'Email not provided' })
    if (!password) { return res.status(400).send({ message: 'Password not provided' }) }
    try {
      const result = await authenticateUserUseCase.execute({ email, password })
      return res.status(200).send(result)
    } catch (error: any) {
      return res.status(500).send({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
export const authenticateUserController = new AuthenticateUserController()
