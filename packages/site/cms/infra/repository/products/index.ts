import { RespositoryMethod } from '../types/Repository';
import {
  getStorePageData,
  ProductsPageQueryResult,
} from './getProductsPageData';

interface CMSProductsRepository {
  getStorePageData: () => RespositoryMethod<ProductsPageQueryResult>;
}

export const cmsProductsRepository = (): CMSProductsRepository => ({
  getStorePageData,
});
