import { RespositoryMethod } from '../types/Repository';
import {
  readStorePageData,
  ReadStorePageQueryResult,
} from './readProductsPageData';
import { updateProduct, UpdateProductRepositoryMethod } from './updateProduct';

interface CMSProductsRepository {
  readStorePageData: () => RespositoryMethod<ReadStorePageQueryResult>;
  updateProduct: () => UpdateProductRepositoryMethod;
}

export const cmsProductsRepository = (): CMSProductsRepository => ({
  readStorePageData,
  updateProduct,
});
