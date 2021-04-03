import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';
import contributionsModule from '../../modules/contributions';

const typeDefs = gql`
  enum ContentLocale {
    PT_BR
    EN_US
  }

  type Query {
    greet: String
  }

  input CreateSampleTextInput {
    text: String!
  }
  type Mutation {
    createSampleText(input: CreateSampleTextInput): String!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [contributionsModule.typeDefs, typeDefs],
  resolvers: {
    Query: {
      ...contributionsModule.resolvers.Query,
      greet: () => 'Welcome to @devsoutinho/cms',
    },
    Mutation: {
      ...contributionsModule.resolvers.Mutation,
      createSampleText: (_: unknown, args) => args.input.text,
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
