import { User } from '../dtos/User'

export interface UserRepository<T = any> {
  create(user: User.Input): Promise<T>;
}
