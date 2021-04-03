import { useQuery, gql, QueryResult, OperationVariables } from '@apollo/client';
import { initializeApollo } from '../../infra/graphql/client';
import { withApolloCache } from '../../infra/apollo/withApolloCache';
import { Contribution } from '../../modules/contributions/type';

type QueryContribution = Pick<
  Contribution,
  'title' | 'url' | 'description' | 'date'
>;

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

interface Service {
  useClient: () => QueryResult<
    { contributions: QueryContribution[] },
    OperationVariables
  >;
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
