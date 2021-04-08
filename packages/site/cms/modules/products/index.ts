/* eslint-disable no-console */
import { getDbConnection } from '../../infra/db/dbFactory';
import { idGenerator } from '../../infra/db/idGenerator';
import {
  Product,
  CreateProductInput,
  QueryProductInput,
  typeDefs,
  UpdateProductInput,
} from './type';

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
      { input }: { input: CreateProductInput }
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
    async updateProduct(
      _: unknown,
      { input, query }: { query: QueryProductInput; input: UpdateProductInput }
    ): Promise<Product> {
      const conn = await getDbConnection();

      return new Promise((resolve, reject) =>
        conn.products.update(
          query,
          { $set: input },
          { returnUpdatedDocs: true },
          (err, numAffected, affectedDocuments, _) => {
            if (err) reject(err);
            if (numAffected === 0)
              reject(new Error(`No data changed for id: "${query._id}"`));

            console.log(affectedDocuments);
            resolve(affectedDocuments);
          }
        )
      );
    },
  },
};

const productsModule = {
  typeDefs,
  resolvers,
};

export default productsModule;
