import { Institution } from '../dtos/Institution'

export interface InstitutionRepository<T = Institution.Output> {
  create(userId: string, institution: Institution.Input): Promise<void>;
  getByName(name: string): Promise<T>;
  getById(id: string): Promise<T>;
  getByUserId(userId: string): Promise<T[]>;
}
