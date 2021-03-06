import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { User } from '../../dtos/User'
import { userRepository } from '../../repositories/implementations/UserRepositoryPrisma'
import { UserRepository } from '../../repositories/UserRepository'

class AuthenticateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (input: User.Auth): Promise<User.Result> {
    const result = await this.userRepository.getByEmail(input.email)
    if (!result) throw new Error('User not found')
    if (!result.verified) throw new Error('User not verified')

    const isValid = await compare(input.password, result.password)
    if (!isValid) throw new Error('Invalid password')

    const token = sign(
      {
        userId: result.id,
        userRole: result.role
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: String(process.env.JWT_EXPIRES_IN)
      }
    )
    const output = {
      user: { id: result.id, email: result.email, role: result.role },
      token
    }

    return output
  }
}
export const authenticateUserUseCase = new AuthenticateUserUseCase(
  userRepository
)
