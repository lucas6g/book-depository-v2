import { Book } from '../../dtos/Book'
import { BookRepository } from '../../repositories/BookRepository'
import { BookRepositoryPrisma } from '../../repositories/implementations/BookRepositoryPrisma'

class GetAllBooksUseCase {
  constructor (private readonly bookRepository: BookRepository) {}

  async execute (): Promise<Book.Output[]> {
    return this.bookRepository.getAll()
  }
}

export const getAllBooksUseCase = new GetAllBooksUseCase(
  new BookRepositoryPrisma()
)
