import { Book } from '../../dtos/Book'
import upload from '../../middlewares/upload'
import multerConfig from '../../config/multer'
import { BookRepository } from '../../repositories/BookRepository'
import { BookRepositoryPrisma } from '../../repositories/implementations/BookRepositoryPrisma'
import { InstitutionRepositoryPrisma } from '../../repositories/implementations/InstitutionRepositoryPrisma'
import { UserRepositoryPrisma } from '../../repositories/implementations/UserRepositoryPrisma'
import { InstitutionRepository } from '../../repositories/InstitutionRepository'
import { UserRepository } from '../../repositories/UserRepository'

class AddBookUseCase {
  constructor (
    private readonly bookRepository: BookRepository,
    private readonly userRepositoy: UserRepository,
    private readonly institutionRepository: InstitutionRepository
  ) {}

  async execute (userId: string, input: Book.Input): Promise<void> {
    const user = await this.userRepositoy.getById(userId)
    if (!user.institution) throw new Error('User must be an institution')

    const institution = await this.institutionRepository.getById(
      input.institutionId
    )
    if (!institution) throw new Error('Institution not found')

    const url = `${process.env.HOST}/files/${input.image?.id}`
    const book = {
      ...input,
      address: { ...input.address },
      image: {
        ...input.image!,
        id: input.image?.id?.split('.')[0],
        url
      }
    }
    try {
      await this.bookRepository.save(user.id, book)
    } catch (err: any) {
      upload.delete(`${multerConfig.destination}/${book.image.key}`)
      throw new Error('Error adding book')
    }
  }
}

export const addBookUseCase = new AddBookUseCase(
  new BookRepositoryPrisma(),
  new UserRepositoryPrisma(),
  new InstitutionRepositoryPrisma()
)
