import { useQuery, gql } from '@apollo/client';
import { Product } from '../../../modules/products/type';
import { RespositoryMethod } from '../types/Repository';
import { initializeApollo } from '../../graphql/client';
import { withApolloCache } from '../../apollo/withApolloCache';

export type ProductsPageQuery = Pick<
  Product,
  'title' | 'url' | 'description' | 'date' | 'image'
>;

export interface ProductsPageQueryResult {
  products: ProductsPageQuery[];
}

export function getStorePageData(): RespositoryMethod<ProductsPageQueryResult> {
  const query = gql`
    query {
      products {
        _id
        title
        url
        description
        image
        date
      }
    }
  `;
  return {
    query,
    useHook: () => useQuery(query),
    async getApolloCacheForNextProps() {
      const apolloClient = initializeApollo();
      await apolloClient.query({
        query,
      });
      return withApolloCache(apolloClient);
    },
  };
}
