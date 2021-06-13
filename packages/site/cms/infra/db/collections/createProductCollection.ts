import Datastore from 'nedb';
import path from 'path';
import allProducts from '../../../../_data/products';
import { Product } from '../../../modules/products/type';
import { createConfig, IS_PROD } from '../createConfig';

export function createProductsCollection(): Datastore<Product> {
  const products = new Datastore<Product>(
    createConfig(path.resolve('./', '_data', 'products.db'))
  );
  if (IS_PROD || (products as any).inMemoryOnly)
    products.insert((allProducts as unknown) as Product[]);

  products.ensureIndex({ fieldName: 'url', unique: true });

  return products;
}
