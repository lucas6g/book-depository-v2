import { Address } from './Address'

export namespace Institution {
  export type Input = {
    name: string;
    address: Address;
  };
  export type Output = {
    id: string;
    name: string;
    address: Address;
    admin: {
      id: string;
      name: string;
      username: string;
      email: string;
    };
    books?: {
      id?: string;
      title?: string;
    }[];
  };
}
