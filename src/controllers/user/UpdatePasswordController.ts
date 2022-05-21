import { Request, Response } from 'express'
import { updatePasswordUseCase } from '../../useCases/user/UpdatePasswordUseCase'

export class UpdatePasswordController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { token, password, passwordConfirmation } = req.body
    if (!token) return res.status(400).send({ message: 'Token not provided' })
    if (!password) {
      return res.status(400).send({ message: 'Password not provided' })
    }
    if (password !== passwordConfirmation) {
      return res
        .status(400)
        .send({ message: 'Password confirmation does not match' })
    }
    try {
      await updatePasswordUseCase.execute(token, password)
      return res.status(200).send({ message: 'Password updated successfully' })
    } catch (err: any) {
      return res.status(400).send({ message: err.message })
    }
  }
}

export const updatePasswordController = new UpdatePasswordController()
