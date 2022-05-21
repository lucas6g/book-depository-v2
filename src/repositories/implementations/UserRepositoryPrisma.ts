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
      },
      select: { id: true, name: true, email: true }
    })
    const tokenResult = await prismaClient.token.create({
      data: { userId: userResult.id, token, isValid: true }
    })
    return { user: userResult, token: tokenResult }
  }

  async getByEmail (email: string): Promise<any> {
    return await prismaClient.user.findUnique({
      where: { email },
      include: {
        image: {
          select: { url: true }
        },
        institution: true,
        books: true
      }
    })
  }

  async getByUserName (username: string): Promise<any> {
    return await prismaClient.user.findUnique({
      where: { username },
      include: {
        image: {
          select: { url: true }
        },
        institution: true,
        books: true
      }
    })
  }

  async getById (id: string): Promise<any> {
    return await prismaClient.user.findUnique({
      where: { id },
      include: {
        image: {
          select: { url: true }
        },
        institution: true,
        books: true
      }
    })
  }

  async validate (userId: string): Promise<void> {
    await prismaClient.user.update({
      where: { id: userId },
      data: { verified: true }
    })
  }

  async update (userId: string, user: User.Input): Promise<void> {
    await prismaClient.user.update({
      where: { id: userId },
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
      }
    })
  }
}

export const userRepository = new UserRepositoryPrisma()
