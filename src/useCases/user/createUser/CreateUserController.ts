import { Request, Response } from 'express'
import { createUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { name, email, username, password, isAdmin } = req.body
    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    try {
      await createUserUseCase.execute({
        name,
        email,
        username,
        password,
        isAdmin
      })
      return res.status(201).send({ message: 'User created successfully' })
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}

export const createUserController = new CreateUserController()
