import { Request, Response } from 'express'
import { addBookUseCase } from '../../useCases/book/AddBookUseCase'

class AddBookController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { userId } = req
    try {
      const book = {
        ...req.body,
        address: {
          ...req.body
        },
        image: {
          id: req.file?.filename,
          name: req.file?.originalname,
          key: req.file?.filename,
          type: req.file?.mimetype,
          size: req.file?.size
        }
      }
      const result = await addBookUseCase.execute(userId, book)
      return res
        .status(201)
        .send({ message: 'Book added successfully', result })
    } catch (err: any) {
      return res.status(400).send({
        message: err.message || 'Unexpected error'
      })
    }
  }
}

export const addBookController = new AddBookController()
