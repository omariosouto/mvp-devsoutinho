import { useMutation, gql } from '@apollo/client';
import {
  Product,
  QueryProductInput,
  UpdateProductInput,
  UpdateProductPayload,
} from '../../../modules/products/type';
import { RespositoryMutationMethod } from '../types/Repository';
export interface UpdateProductVariables {
  query: QueryProductInput;
  input: UpdateProductInput;
}
// TODO: Remove "title" from here, and define strategy to handle cache update
export type UpdateProductMutationResult = Pick<Product, '_id'>;
const UPDATE_PRODUCT_MUTATION = gql`
  mutation($query: QueryProductInput, $input: UpdateProductInput) {
    updateProduct(query: $query, input: $input) {
      product {
        _id
      }
    }
  }
`;

export type UpdateProductRepositoryMethod = RespositoryMutationMethod<
  UpdateProductPayload,
  UpdateProductVariables
>;
export function updateProduct(): UpdateProductRepositoryMethod {
  return {
    query: UPDATE_PRODUCT_MUTATION,
    // TODO: Receive functions that update the cache here
    useHook() {
      return useMutation(UPDATE_PRODUCT_MUTATION);
    },
  };
}
