import { prismaClient } from '../../database/prismaClient'
import { User } from '../../dtos/User'
import { UserRepository } from '../UserRepository'

export class UserRepositoryPrisma implements UserRepository {
  async create (user: User.Input, token: string): Promise<any> {
    const userResult = await prismaClient.user.create({
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
      }
    })
    return { user: userResult }
  }

  async getByEmail (email: string): Promise<any> {
    return await prismaClient.user.findUnique({
      where: { email }
    })
  }

  async getByUserName (username: string): Promise<any> {
    return await prismaClient.user.findUnique({
      where: { username }
    })
  }
}

export const userRepository = new UserRepositoryPrisma()
