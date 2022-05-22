import { prismaClient } from '../../database/prismaClient'
import { Book } from '../../dtos/Book'
import { BookRepository } from '../BookRepository'

export class BookRepositoryPrisma implements BookRepository {
  async save (userId: string, book: Book.Input): Promise<void> {
    const { address, image } = book
    await prismaClient.book.create({
      data: {
        title: book.title,
        author: book.author,
        edition: book.edition,
        year: book.year,
        publishedDate: book.publishedDate,
        quantity: book.quantity,
        description: book.description,
        bookCondition: book.bookCondition,
        user: { connect: { id: userId } },
        institution: { connect: { id: book.institutionId } },
        image: {
          create: {
            id: image?.id!,
            url: image?.url!,
            name: image?.name!,
            key: image?.key,
            type: image?.type!,
            size: image?.size!
          }
        },
        address: {
          create: {
            street: address.street,
            number: address.number,
            reference: address.reference,
            zip: address.zip,
            city: address.city,
            state: address.state
          }
        }
      }
    })
  }

  async getByName (name: string): Promise<Book.Output> {
    throw new Error('Method not implemented.')
  }

  async getByUser (userId: string): Promise<Book.Output[]> {
    throw new Error('Method not implemented.')
  }

  async getAll (): Promise<Book.Output[]> {
    const books = await prismaClient.book.findMany({
      include: {
        institution: {
          include: {
            user: true,
            address: true
          }
        },
        image: true,
        address: true
      }
    })
    return books.map((book) => {
      const { institution, image, address } = book
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        edition: book.edition,
        year: book.year,
        publishedDate: book.publishedDate,
        quantity: book.quantity,
        description: book.description,
        available: book.available,
        bookCondition: book.bookCondition,
        imageUrl: image.url,
        institution: {
          id: institution.id,
          name: institution.name
        },
        user: {
          id: institution.user.id,
          name: institution.user.name
        },
        address: {
          street: address.street,
          number: address.number,
          reference: address.reference,
          zip: address.zip,
          city: address.city,
          state: address.state
        }
      }
    })
  }
}
