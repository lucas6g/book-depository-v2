import { Request, Response } from 'express'
import { getAllUserInstitutionsUseCase } from '../../useCases/institution/GetAllUserInstitutionsUseCase'

class GetAllUserInstitutionsController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { userId } = req
    try {
      const institutions = await getAllUserInstitutionsUseCase.execute(userId)
      return res
        .status(200)
        .send({ message: 'Institutions found', data: institutions })
    } catch (err: any) {
      return res.status(400).send({
        message: err.message || 'Unexpected error'
      })
    }
  }
}

export const getAllUserInstitutionsController =
  new GetAllUserInstitutionsController()
