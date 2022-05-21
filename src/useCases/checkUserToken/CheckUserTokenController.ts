import { Request, Response } from 'express'
import { checkUserTokenUseCase } from './CheckUserTokenUseCase'

class CheckUserTokenController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { token } = req.body
    if (!token) return res.status(400).send({ message: 'Token not provided' })
    if (token.length !== 6) { return res.status(400).send({ message: 'Invalid token' }) }
    try {
      await checkUserTokenUseCase.execute(token)
      return res.status(200).send({ message: 'Token successfully verified' })
    } catch (err: any) {
      return res.status(400).send({ message: err.message })
    }
  }
}
export const checkUserTokenController = new CheckUserTokenController()
