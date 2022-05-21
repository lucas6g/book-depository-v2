import { prismaClient } from '../../database/prismaClient'
import { User } from '../../dtos/User'
import { UserRepository } from '../UserRepository'

export class UserRepositoryPrisma implements UserRepository {
  async create (user: User.Input): Promise<any> {
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
}

export const userRepository = new UserRepositoryPrisma()
