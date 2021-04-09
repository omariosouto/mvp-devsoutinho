import { useMutation, gql } from '@apollo/client';
import { Product } from '../../../modules/products/type';
import { RespositoryMutationMethod } from '../types/Repository';

export type UpdateProductMutationResult = Pick<Product, '_id' | 'title'>;
const UPDATE_PRODUCT_MUTATION = gql`
  mutation($query: QueryProductInput, $input: UpdateProductInput) {
    updateProduct(query: $query, input: $input) {
      _id
      title
    }
  }
`;

// TODO: Mover o CMS para um modulo externo again
// TODO: Tentar usar as interfaces criadas pro CMS
type UpdateProductQuery = Pick<Product, '_id'>;
type UpdateProductInput = Partial<Omit<Product, '_id'>>;

export interface UpdateProductVariables {
  query: UpdateProductQuery;
  input: UpdateProductInput;
}

export function updateProduct(): RespositoryMutationMethod<
  UpdateProductMutationResult,
  UpdateProductVariables
> {
  return {
    query: UPDATE_PRODUCT_MUTATION,
    useHook() {
      // TODO: Create a middleware for this function
      return useMutation(UPDATE_PRODUCT_MUTATION);
    },
  };
}
