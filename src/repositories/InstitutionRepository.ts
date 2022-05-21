import { Institution } from '../dtos/Institution'

export interface InstitutionRepository<T = any> {
  create(userId: string, institution: Institution.Input): Promise<void>;
  findByName(name: string): Promise<T>;
}
