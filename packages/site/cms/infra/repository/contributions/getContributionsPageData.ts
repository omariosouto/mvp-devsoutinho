import { useQuery, gql } from '@apollo/client';
import { Contribution } from '../../../modules/contributions/type';
import { RespositoryMethod } from '../types/Repository';
import { initializeApollo } from '../../graphql/client';
import { withApolloCache } from '../../apollo/withApolloCache';

export type ContributionsPageQuery = Pick<
  Contribution,
  'title' | 'url' | 'description' | 'date'
>;
export function getContributionsPageData(): RespositoryMethod<ContributionsPageQuery> {
  const query = gql`
    query {
      contributions {
        title
        url
        description
        date
      }
    }
  `;
  return {
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
