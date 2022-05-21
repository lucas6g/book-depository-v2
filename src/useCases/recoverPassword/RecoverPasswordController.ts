import { Request, Response } from 'express'
import { recoverPasswordUseCase } from './RecoverPasswordUseCase'

class RecoverPasswordController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    if (!email) return res.status(400).send({ message: 'Email not provided' })
    try {
      await recoverPasswordUseCase.execute(email)
      return res.status(200).send({ message: 'Email sent successfully' })
    } catch (err: any) {
      return res.status(400).send({ message: err.message })
    }
  }
}
export const recoverPasswordController = new RecoverPasswordController()
