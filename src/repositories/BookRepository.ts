import { Book } from '../dtos/Book'

export interface BookRepository {
  save(userId: string, institutionId: string, book: Book.Input): Promise<void>;
  getByName(name: string): Promise<Book.Output>;
  getByUser(userId: string): Promise<Book.Output[]>;
  getAll(): Promise<Book.Output[]>;
}
