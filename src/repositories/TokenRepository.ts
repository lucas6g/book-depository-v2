export interface TokenRepository<T = any> {
  setToken(userId: string, token: string): Promise<void>;
  getToken(token: string): Promise<T>;
  verify(token: string): Promise<T>;
  validate(token: string): Promise<void>;
}
