import { MailProviderNodemailer } from '../../providers/implementations/MailProviderNodemailer'
import { MailProvider } from '../../providers/MailProvider'
import { TokenRepositoryPrisma } from '../../repositories/implementations/TokenRepositoryPrisma'
import { UserRepositoryPrisma } from '../../repositories/implementations/UserRepositoryPrisma'
import { TokenRepository } from '../../repositories/TokenRepository'
import { UserRepository } from '../../repositories/UserRepository'

class RecoverPasswordUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly mailProvider: MailProvider
  ) {}

  async execute (email: string): Promise<void> {
    const result = await this.userRepository.getByEmail(email)
    if (!result) throw new Error('User not found')

    const token = (Math.floor(Math.random() * 90000) + 100000).toString()

    try {
      await this.mailProvider.sendMail({
        to: { name: result.name, email: result.email },
        from: { name: 'Book Depository', email: String(process.env.MAIL_FROM) },
        subject: 'Recuperação de Senha',
        text: 'Recuperação de Senha',
        html: `<p>Seu código de recuperação de senha é <strong>${token}</strong></p>`
      })
      await this.tokenRepository.setToken(result.id, token)
    } catch (error: any) {
      throw new Error(`Error on recover password: ${error.message}`)
    }
  }
}
export const recoverPasswordUseCase = new RecoverPasswordUseCase(
  new UserRepositoryPrisma(),
  new TokenRepositoryPrisma(),
  new MailProviderNodemailer()
)
