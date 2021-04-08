import { gql } from 'apollo-server-micro';
import { ContentLocale } from '../../server/handler/types';
// import { Category } from '../category/type';
// import { Tag } from '../tags/type';

export interface Product {
  _id: string;
  lang: ContentLocale;
  title: string;
  date: string;
  url: string;
  description: string;
  image?: string;
  // tags: Tag[];
  // category: Category[];
}

export type QueryProductInput = Pick<Product, '_id' | 'title'>;

export type CreateProductInput = Omit<Product, '_id'>;

export type UpdateProductInput = Omit<Product, '_id'>;

export const typeDefs = gql`
  type Product {
    _id: String
    lang: ContentLocale
    title: String
    date: String
    url: String
    description: String
    image: String
  }

  input CreateProductInput {
    lang: ContentLocale!
    title: String!
    date: String
    url: String!
    description: String!
    image: String
  }

  input UpdateProductInput {
    lang: ContentLocale
    title: String
    date: String
    url: String
    description: String
    image: String
  }

  input QueryProductInput {
    _id: String
    title: String
  }
  extend type Query {
    products(input: QueryProductInput): [Product]!
    product(input: QueryProductInput): Product
  }
  extend type Mutation {
    createProduct(input: CreateProductInput): Product
    updateProduct(input: UpdateProductInput, query: QueryProductInput): Product
  }
`;
