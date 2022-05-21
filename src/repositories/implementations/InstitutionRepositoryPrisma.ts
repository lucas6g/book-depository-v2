import { InstitutionRepository } from '../InstitutionRepository'
import { prismaClient } from '../../database/prismaClient'
import { Institution } from '../../dtos/Institution'

export class InstitutionRepositoryPrisma implements InstitutionRepository {
  async create (userId: string, institution: Institution.Input): Promise<void> {
    const { name, address } = institution
    await prismaClient.institution.create({
      data: {
        name,
        user: { connect: { id: userId } },
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

  async getByName (name: string): Promise<any> {
    return await prismaClient.institution.findUnique({
      where: { name },
      include: { address: true, books: true }
    })
  }

  async getById (id: string): Promise<any> {
    return await prismaClient.institution.findUnique({
      where: { id },
      include: { address: true, books: true }
    })
  }
}
