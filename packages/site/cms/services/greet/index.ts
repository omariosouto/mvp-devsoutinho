import { useQuery, gql } from '@apollo/client';
import { initializeApollo } from '@devsoutinho/cms/infra/graphql/client';

import { withApolloCache } from '../../infra/apollo/withApolloCache';

const sampleQuery = gql`
  query {
    greet
  }
`;

export function cmsGreetService() {
  return {
    useClient: () => useQuery(sampleQuery),
    async useServer() {
      const apolloClient = initializeApollo();
      return {
        apolloClient,
        ...(await apolloClient.query({
          query: sampleQuery,
        })),
        apolloCache: withApolloCache(apolloClient),
      };
    },
  };
}
