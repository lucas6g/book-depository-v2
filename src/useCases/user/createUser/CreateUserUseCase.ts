import { hash } from 'bcrypt'
import validator from 'validator'
import env from '../../../config/env'
import { User } from '../../../dtos/User'
import { Role } from '../../../enums/Role'
import { MailProviderNodemailer } from '../../../providers/implementations/MailProviderNodemailer'
import { MailProvider } from '../../../providers/MailProvider'
import { userRepository } from '../../../repositories/implementations/UserRepositoryPrisma'
import { UserRepository } from '../../../repositories/UserRepository'

class CreateUserUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly mailProvider: MailProvider
  ) {}

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
    const token = (Math.floor(Math.random() * 90000) + 100000).toString()
    await this.userRepository.create(user, token)
    try {
      await this.mailProvider.sendMail({
        to: { name: user.name, email: user.email },
        from: { name: 'Book Depository', email: env.mail.from },
        subject: 'Confirmação de Cadastro',
        text: 'Seja bem vindo ao Book Depository',
        html: ` <p>Seja bem vindo ao Book Depository, ${user.name}!</p>
                <p>Seu código de confirmação é <strong>${token}</strong></p>`
      })
    } catch (error: any) {
      throw new Error(`Error sending email: ${error.message}`)
    }
  }
}
const mailProvider = new MailProviderNodemailer()
export const createUserUseCase = new CreateUserUseCase(
  userRepository,
  mailProvider
)
