import { Role } from '../enums/Role'

export namespace User {
  export type Input = {
    name: string;
    email: string;
    username: string;
    password: string;
    isAdmin?: boolean;
    role?: Role;
  };
  export type Output = {
    id: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    imageUrl?: string;
    verified?: boolean;
    role?: Role;
    institution?: {
      id?: string;
      name?: string;
    }[];
  };
  export type Auth = {
    email: string;
    password: string;
  };
  export type Result = {
    user: {
      id: string;
      email: string;
      role: string;
    };
    token: string;
  };
}
