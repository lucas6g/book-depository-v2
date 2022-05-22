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

  async getByName (name: string): Promise<Institution.Output> {
    const institution = await prismaClient.institution.findUnique({
      where: { name },
      include: { address: true, books: true }
    })
    return institution!
  }

  async getById (id: string): Promise<Institution.Output> {
    const institution = await prismaClient.institution.findUnique({
      where: { id },
      include: { address: true, books: true }
    })
    return institution!
  }

  async getByUserId (userId: string): Promise<Institution.Output[]> {
    const institutions = await prismaClient.institution.findMany({
      where: { user: { id: userId } },
      include: { address: true, books: true }
    })
    return institutions
  }
}
