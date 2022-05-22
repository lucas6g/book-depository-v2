import { Institution } from '../../dtos/Institution'
import { InstitutionRepositoryPrisma } from '../../repositories/implementations/InstitutionRepositoryPrisma'
import { InstitutionRepository } from '../../repositories/InstitutionRepository'

class GetAllUserInstitutionsUseCase {
  constructor (private readonly institutionRepository: InstitutionRepository) {}
  async execute (userId: string): Promise<Institution.Output[]> {
    const institutions = await this.institutionRepository.getByUserId(userId)
    const result = institutions.map((institution) => {
      return {
        id: institution.id,
        name: institution.name,
        address: institution.address
      }
    })
    return result
  }
}

export const getAllUserInstitutionsUseCase = new GetAllUserInstitutionsUseCase(
  new InstitutionRepositoryPrisma()
)
