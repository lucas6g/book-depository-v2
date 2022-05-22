import { BookCondition } from '../enums/BookCondition'
import { Address } from './Address'
import { Image } from './Image'

export namespace Book {
  export type Input = {
    title: string;
    author: string;
    edition: string;
    year: string;
    publishedDate: string;
    quantity: string;
    description: string;
    institutionId: string;
    bookCondition: BookCondition;
    address: Address;
    image?: Image;
  };
  export type Output = {
    id: string;
    title: string;
    author: string;
    edition: string;
    year: string;
    publishedDate: string;
    quantity: string;
    available: boolean;
    bookCondition: string;
    imageUrl: string;
    institution?: {
      id: string;
      name: string;
    };
    user?: {
      id: string;
      name: string;
    };
    address?: Address;
  };
}
