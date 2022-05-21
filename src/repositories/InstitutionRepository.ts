import { Institution } from '../dtos/Institution'

export interface InstitutionRepository<T = any> {
  create(userId: string, institution: Institution.Input): Promise<void>;
  getByName(name: string): Promise<T>;
  getById(id: string): Promise<T>;
}
