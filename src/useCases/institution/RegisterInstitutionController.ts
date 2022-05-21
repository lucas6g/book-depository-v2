import { Request, Response } from 'express'
import { registerInstitutionUseCase } from './RegisterInstitutionUseCase'

class RegisterInstitutionController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { userId } = req
    const { name, address } = req.body
    if (!userId) return res.status(400).send({ error: 'User ID is required' })
    try {
      await registerInstitutionUseCase.execute(userId, { name, address })
      return res
        .status(201)
        .send({ message: 'Institution registered successfully' })
    } catch (error: any) {
      return res.status(400).send({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export const registerInstitutionController =
  new RegisterInstitutionController()