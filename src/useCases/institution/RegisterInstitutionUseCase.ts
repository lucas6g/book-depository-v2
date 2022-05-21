import { UserRepositoryPrisma } from '../../repositories/implementations/UserRepositoryPrisma'
import { MailProviderNodemailer } from '../../providers/implementations/MailProviderNodemailer'
import { UserRepository } from '../../repositories/UserRepository'
import { MailProvider } from '../../providers/MailProvider'
import { Institution } from '../../dtos/Institution'
import env from '../../config/env'
import { Role } from '../../enums/Role'
import { InstitutionRepository } from '../../repositories/InstitutionRepository'
import { InstitutionRepositoryPrisma } from '../../repositories/implementations/InstitutionRepositoryPrisma'

class RegisterInstitutionUseCase {
  constructor (
    private readonly institutionRepository: InstitutionRepository,
    private readonly userRepository: UserRepository,
    private readonly mailProvider: MailProvider
  ) {}

  async execute (userId: string, input: Institution.Input): Promise<void> {
    const user = await this.userRepository.getById(userId)
    if (user.role !== Role.INSTITUTION_ADMIN) {
      throw new Error('User is not an institution admin')
    }
    const exist = await this.institutionRepository.findByName(input.name)
    if (exist) throw new Error('Institution already exists')

    try {
      await this.institutionRepository.create(user.id, {
        name: input.name,
        address: {
          street: input.address.street,
          number: input.address.number,
          reference: input.address.reference,
          zip: input.address.zip,
          city: input.address.city,
          state: input.address.state
        }
      })
      await this.mailProvider.sendMail({
        to: { name: user.name, email: user.email },
        from: { name: 'Meu App', email: env.mail.from },
        subject: 'Confirmação de Registro',
        text: 'Registro de Instituição',
        html: ` <p>${user.name}, sua instituição ${input.name} foi registrada com sucesso, </p>
                        <p> agora você pode cadastrar seus livros.</p>
                        <br>
                        <p> Endereço: ${input.address.street}, ${input.address.number}, ${input.address.reference}</p>
                        <p> CEP: ${input.address.zip}</p>
                        <p> Cidade: ${input.address.city}</p>
                        <p> Estado: ${input.address.state}</p>`
      })
    } catch (error: any) {
      throw new Error(`Error sending email: ${error.message}`)
    }
  }
}
export const registerInstitutionUseCase = new RegisterInstitutionUseCase(
  new InstitutionRepositoryPrisma(),
  new UserRepositoryPrisma(),
  new MailProviderNodemailer()
)
