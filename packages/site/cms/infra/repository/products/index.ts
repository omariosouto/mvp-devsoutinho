import {
  RespositoryMethod,
  RespositoryMutationMethod,
} from '../types/Repository';
import {
  readStorePageData,
  ProductsPageQueryResult,
} from './readProductsPageData';
import {
  UpdateProductMutationResult,
  UpdateProductVariables,
  updateProduct,
} from './updateProduct';

interface CMSProductsRepository {
  readStorePageData: () => RespositoryMethod<ProductsPageQueryResult>;
  updateProduct: () => RespositoryMutationMethod<
    UpdateProductMutationResult,
    UpdateProductVariables
  >;
}

export const cmsProductsRepository = (): CMSProductsRepository => ({
  readStorePageData,
  updateProduct,
});
