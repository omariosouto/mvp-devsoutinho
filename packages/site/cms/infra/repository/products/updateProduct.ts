import { useMutation, gql } from '@apollo/client';
import {
  Product,
  QueryProductInput,
  UpdateProductInput,
} from '../../../modules/products/type';
import { RespositoryMutationMethod } from '../types/Repository';

export interface UpdateProductVariables {
  query: QueryProductInput;
  input: UpdateProductInput;
}
export type UpdateProductMutationResult = Pick<Product, '_id'>;
const UPDATE_PRODUCT_MUTATION = gql`
  mutation($query: QueryProductInput, $input: UpdateProductInput) {
    updateProduct(query: $query, input: $input) {
      _id
    }
  }
`;

export function updateProduct(): RespositoryMutationMethod<
  UpdateProductMutationResult,
  UpdateProductVariables
> {
  return {
    query: UPDATE_PRODUCT_MUTATION,
    // TODO: Receive functions that update the cache here
    useHook() {
      return useMutation(UPDATE_PRODUCT_MUTATION);
    },
  };
}
