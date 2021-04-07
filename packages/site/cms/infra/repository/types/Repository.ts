import {
  QueryResult,
  OperationVariables,
  ApolloCache,
  InMemoryCache,
} from '@apollo/client';

interface ApolloCacheOnServerProps {
  initialApolloState: ApolloCache<InMemoryCache>;
}

export interface RespositoryMethod<ReturnValue> {
  useHook: () => QueryResult<
    { contributions: ReturnValue[] },
    OperationVariables
  >;
  getApolloCacheForNextProps(): Promise<ApolloCacheOnServerProps>;
}
