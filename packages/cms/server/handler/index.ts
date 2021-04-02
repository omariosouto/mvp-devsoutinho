import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';
import contributionsModule from '../../modules/contributions';

const typeDefs = gql`
  type Query {
    greet: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [contributionsModule.typeDefs, typeDefs],
  resolvers: {
    Query: {
      ...contributionsModule.resolvers.Query,
      greet: () => 'Welcome to @devsoutinho/cms',
    },
  },
});

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
});

export function handler(req: Request, res: Response): void {
  server.createHandler({
    path: '/api/graphql/',
  })(req, res);
}
