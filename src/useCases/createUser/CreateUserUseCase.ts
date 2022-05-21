import { User } from '../../dtos/User'
import { Role } from '../../enums/Role'
import { userRepository } from '../../repositories/implementations/UserRepositoryPrisma'
import { UserRepository } from '../../repositories/UserRepository'

class CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (input: User.Input): Promise<void> {
    const emailExist = await this.userRepository.getByEmail(input.email)
    if (emailExist) { throw new Error(`User with email '${input.email}' already exists`) }
    let user
    if (input.isAdmin) {
      user = { ...input, role: Role.INSTITUTION_ADMIN }
    } else {
      user = { ...input, role: Role.USER }
    }
    await this.userRepository.create(user)
  }
}
export const createUserUseCase = new CreateUserUseCase(userRepository)
