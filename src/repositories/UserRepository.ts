import { User } from '../dtos/User'

export interface UserRepository<T = any> {
  create(user: User.Input, token: string): Promise<T>;
  getByEmail(email: string): Promise<T>;
  getByUserName(username: string): Promise<T>;
  getById(id: string): Promise<T>;
  validate(userId: string): Promise<void>;
  update(userId: string, user: User.Input): Promise<void>;
}
