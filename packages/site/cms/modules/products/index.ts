/* eslint-disable no-console */
import { getDbConnection } from '../../infra/db/dbFactory';
import { idGenerator } from '../../infra/db/idGenerator';
import { Product, NewProductInput, QueryProductInput, typeDefs } from './type';

const resolvers = {
  Query: {
    async products(): Promise<Product[]> {
      const conn = await getDbConnection();
      return new Promise((resolve, reject) =>
        conn.products.find({}, (err, data) => {
          if (err) reject(err);
          resolve(data);
        })
      );
    },
    async product(
      _: unknown,
      { input }: { input: QueryProductInput }
    ): Promise<Product> {
      const conn = await getDbConnection();
      return new Promise((resolve, reject) =>
        conn.products.findOne(
          {
            ...input,
          },
          (err, data) => {
            if (err) reject(err);
            resolve(data);
          }
        )
      );
    },
  },
  Mutation: {
    async createProduct(
      _: unknown,
      { input }: { input: NewProductInput }
    ): Promise<Product> {
      const conn = await getDbConnection();
      const registrationDate = input.date ? new Date(input.date) : new Date();
      const product: Product = {
        ...input,
        _id: idGenerator(),
        date: registrationDate.toISOString(),
      };

      return new Promise((resolve, reject) =>
        conn.products.insert(product, (err, data) => {
          if (err) reject(err);
          resolve(data);
        })
      );
    },
  },
};

const productsModule = {
  typeDefs,
  resolvers,
};

export default productsModule;
