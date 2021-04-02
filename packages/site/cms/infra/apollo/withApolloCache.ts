export function withApolloCache(apolloClient) {
    return {
        initialApolloState: apolloClient.cache.extract(),
    }
}