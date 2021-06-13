import Datastore from 'nedb';
import { Contribution } from '../../modules/contributions/type';
import { Product } from '../../modules/products/type';
import { createContributionsCollection } from './collections/createContributionsCollection';
import { createProductsCollection } from './collections/createProductCollection';

interface DevSoutinhoDatabase {
  contributions: Datastore<Contribution>;
  products: Datastore<Product>;
}
const db: DevSoutinhoDatabase = {
  contributions: createContributionsCollection(),
  products: createProductsCollection(),
};

export async function getDbConnection(): Promise<DevSoutinhoDatabase> {
  return db;
}
