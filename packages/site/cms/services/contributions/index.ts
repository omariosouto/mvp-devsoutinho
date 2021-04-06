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
      dataFormated: date(input: { format: "dd-MM-YY" })
      date
    }
  }
`;

interface Service {
  useHook: () => QueryResult<
    { contributions: QueryContribution[] },
    OperationVariables
  >;
  get(): Promise<any>;
}

export function cmsContributionsService(): Service { // Service<Client, Server>
  return {
    useHook: () => useQuery(query),
    async getApolloCache() {
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
// - exportar 2 funções: client e server
