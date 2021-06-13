import {
  QueryResult,
  OperationVariables,
  ApolloCache,
  InMemoryCache,
  DocumentNode,
  MutationTuple,
  FetchResult,
} from '@apollo/client';

interface ApolloCacheOnServerProps {
  initialApolloState: ApolloCache<InMemoryCache>;
}

export interface RespositoryMethod<ReturnValue> {
  query: DocumentNode;
  updateCache: <Payload, Input>(
    cache: ApolloCache<Payload>,
    mutationResult: FetchResult<
      Payload,
      Record<string, any>,
      Record<string, any>
    >,
    input: Input
  ) => void;
  useHook: () => QueryResult<ReturnValue, OperationVariables>;
  getApolloCacheForNextProps(): Promise<ApolloCacheOnServerProps>;
}

export interface RespositoryMutationMethod<ReturnValue, MutationVariables> {
  query: DocumentNode;
  useHook: () => MutationTuple<ReturnValue, MutationVariables>;
}
