import { useQuery, gql, QueryResult, OperationVariables } from '@apollo/client';
import { initializeApollo } from '@devsoutinho/cms/infra/graphql/client';

import { withApolloCache } from '../../infra/apollo/withApolloCache';

const query = gql`
  query {
    contributions {
      name
      url
    }
  }
`;

interface Service {
  useClient: () => QueryResult<any, OperationVariables>;
  useServer(): Promise<any>;
}

export function cmsContributionsService(): Service {
  return {
    useClient: () => useQuery(query),
    async useServer() {
      const apolloClient = initializeApollo();
      return {
        apolloClient,
        ...(await apolloClient.query({
          query,
        })),
        apolloCache: withApolloCache(apolloClient),
      };
    },
  };
}
