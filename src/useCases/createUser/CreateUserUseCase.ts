import { hash } from 'bcrypt'
import validator from 'validator'
import { User } from '../../dtos/User'
import { Role } from '../../enums/Role'
import { userRepository } from '../../repositories/implementations/UserRepositoryPrisma'
import { UserRepository } from '../../repositories/UserRepository'

class CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (input: User.Input): Promise<void> {
    const isValid = validator.isEmail(input.email)
    if (!isValid) throw new Error(`Invalid email: '${input.email}'`)
    const emailExist = await this.userRepository.getByEmail(input.email)
    if (emailExist) {
      throw new Error(`User with email '${input.email}' already exists`)
    }
    const usernameExist = await this.userRepository.getByUserName(
      input.username
    )
    if (usernameExist) {
      throw new Error(`User with username '${input.username}' already exists`)
    }
    const passwordHash = await hash(input.password, 12)
    let user
    if (input.isAdmin) {
      user = { ...input, role: Role.INSTITUTION_ADMIN }
    } else {
      user = { ...input, role: Role.USER }
    }
    user.password = passwordHash
    await this.userRepository.create(user)
  }
}
export const createUserUseCase = new CreateUserUseCase(userRepository)
