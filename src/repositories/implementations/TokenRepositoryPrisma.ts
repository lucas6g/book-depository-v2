import { prismaClient } from '../../database/prismaClient'
import { TokenRepository } from '../TokenRepository'

export class TokenRepositoryPrisma implements TokenRepository {
  async setToken (userId: string, token: string): Promise<void> {
    await prismaClient.token.upsert({
      where: { userId },
      create: { userId, token },
      update: { token, isValid: true, verified: false }
    })
  }

  async getToken (token: string): Promise<any> {
    return await prismaClient.token.findUnique({
      where: { token },
      select: { token: true, isValid: true, verified: true, userId: true }
    })
  }

  async verify (token: string): Promise<any> {
    const exist = await this.getToken(token)
    let output
    if (exist) {
      output = await prismaClient.token.update({
        where: { token },
        data: { verified: true },
        select: { token: true, isValid: true, verified: true, userId: true }
      })
    }
    return output
  }

  async validate (token: string): Promise<void> {
    await prismaClient.token.update({
      where: { token },
      data: { isValid: false }
    })
  }
}
