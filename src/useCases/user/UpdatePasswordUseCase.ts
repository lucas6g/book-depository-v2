import { hash } from 'bcrypt'
import { MailProviderNodemailer } from '../../providers/implementations/MailProviderNodemailer'
import { MailProvider } from '../../providers/MailProvider'
import { TokenRepositoryPrisma } from '../../repositories/implementations/TokenRepositoryPrisma'
import { UserRepositoryPrisma } from '../../repositories/implementations/UserRepositoryPrisma'
import { TokenRepository } from '../../repositories/TokenRepository'
import { UserRepository } from '../../repositories/UserRepository'

class UpdatePasswordUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly mailProvider: MailProvider
  ) {}

  async execute (token: string, password: string): Promise<void> {
    const tokenResult = await this.tokenRepository.getToken(token)
    if (!tokenResult) throw new Error('Invalid token')
    if (!tokenResult.isValid) throw new Error('Token expired')
    if (!tokenResult.verified) throw new Error('Token not verified')

    const user = await this.userRepository.getById(tokenResult.userId)
    if (!user) throw new Error('User not found')
    if (!user.verified) throw new Error('User not verified')

    try {
      const passwordHash = await hash(password, 12)
      await this.userRepository.update(user.id, {
        ...user,
        password: passwordHash
      })
      await this.mailProvider.sendMail({
        to: { name: user.name, email: user.email },
        from: { name: 'Book Depository', email: String(process.env.MAIL_FROM) },
        subject: 'Alteração de senha',
        text: 'Alteração de senha',
        html: ' <p>Sua senha foi alterada com sucesso!</p>'
      })
    } catch (err: any) {
      throw new Error(`Error on update password: ${err.message}`)
    }
    await this.tokenRepository.validate(token)
  }
}
export const updatePasswordUseCase = new UpdatePasswordUseCase(
  new UserRepositoryPrisma(),
  new TokenRepositoryPrisma(),
  new MailProviderNodemailer()
)
