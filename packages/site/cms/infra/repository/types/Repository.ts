import {
  QueryResult,
  OperationVariables,
  ApolloCache,
  InMemoryCache,
  DocumentNode,
  MutationTuple,
} from '@apollo/client';

interface ApolloCacheOnServerProps {
  initialApolloState: ApolloCache<InMemoryCache>;
}

export interface RespositoryMethod<ReturnValue> {
  query: DocumentNode;
  useHook: () => QueryResult<ReturnValue, OperationVariables>;
  getApolloCacheForNextProps(): Promise<ApolloCacheOnServerProps>;
}

export interface RespositoryMutationMethod<ReturnValue, MutationVariables> {
  query: DocumentNode;
  useHook: () => MutationTuple<ReturnValue, MutationVariables>;
}
