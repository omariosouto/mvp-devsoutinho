import { ApolloClient, InMemoryCache } from '@apollo/client';

export function withApolloCache(
  apolloClient: ApolloClient<InMemoryCache>
): { initialApolloState: any } {
  return {
    initialApolloState: apolloClient.cache.extract(),
  };
}
