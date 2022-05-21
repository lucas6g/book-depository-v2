import { Request, Response } from 'express'
import { getAllBooksUseCase } from '../../useCases/book/GetAllBooksUseCase'

class GetAllBooksController {
  async handle (_req: Request, res: Response): Promise<Response> {
    try {
      const books = await getAllBooksUseCase.execute()
      return res
        .status(200)
        .send({ message: 'Books fetched successfully', books })
    } catch (err: any) {
      return res.status(400).send({
        message: err.message || 'Unexpected error'
      })
    }
  }
}

export const getAllBooksController = new GetAllBooksController()
