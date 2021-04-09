import {
  RespositoryMethod,
  RespositoryMutationMethod,
} from '../types/Repository';
import {
  readStorePageData,
  ReadStorePageQueryResult,
} from './readProductsPageData';
import {
  UpdateProductMutationResult,
  UpdateProductVariables,
  updateProduct,
} from './updateProduct';

interface CMSProductsRepository {
  readStorePageData: () => RespositoryMethod<ReadStorePageQueryResult>;
  updateProduct: () => RespositoryMutationMethod<
    UpdateProductMutationResult,
    UpdateProductVariables
  >;
}

export const cmsProductsRepository = (): CMSProductsRepository => ({
  readStorePageData,
  updateProduct,
});
