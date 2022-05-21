import { TokenRepositoryPrisma } from '../../repositories/implementations/TokenRepositoryPrisma'
import { UserRepositoryPrisma } from '../../repositories/implementations/UserRepositoryPrisma'
import { TokenRepository } from '../../repositories/TokenRepository'
import { UserRepository } from '../../repositories/UserRepository'

class CheckUserTokenUseCase {
  constructor (
    private readonly tokenRepository: TokenRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute (token: string): Promise<void> {
    const result = await this.tokenRepository.getToken(token)
    if (!result) throw new Error('Invalid token')

    const user = await this.userRepository.getById(result.userId)
    if (!user) throw new Error('User not found')

    if (!user.verified) {
      await this.userRepository.validate(user.id)
      await this.tokenRepository.validate(token)
    }

    if (!result.isValid) throw new Error('Token expired')
    await this.tokenRepository.verify(token)
  }
}

export const checkUserTokenUseCase = new CheckUserTokenUseCase(
  new TokenRepositoryPrisma(),
  new UserRepositoryPrisma()
)
