import {
  QueryResult,
  OperationVariables,
  ApolloCache,
  InMemoryCache,
  DocumentNode,
} from '@apollo/client';

interface ApolloCacheOnServerProps {
  initialApolloState: ApolloCache<InMemoryCache>;
}

export interface RespositoryMethod<ReturnValue> {
  query: DocumentNode;
  useHook: () => QueryResult<ReturnValue, OperationVariables>;
  getApolloCacheForNextProps(): Promise<ApolloCacheOnServerProps>;
}
