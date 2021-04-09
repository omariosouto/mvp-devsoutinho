import { useQuery, gql } from '@apollo/client';
import { Product } from '../../../modules/products/type';
import { RespositoryMethod } from '../types/Repository';
import { initializeApollo } from '../../graphql/client';
import { withApolloCache } from '../../apollo/withApolloCache';

export type ReadStorePageQuery = Pick<
  Product,
  '_id' | 'title' | 'url' | 'description' | 'date' | 'image'
>;
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

export interface ReadStorePageQueryResult {
  products: ReadStorePageQuery[];
}

export function readStorePageData(): RespositoryMethod<ReadStorePageQueryResult> {
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
