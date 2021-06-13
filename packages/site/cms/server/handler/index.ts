import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';
import contributionsModule from '../../modules/contributions';
import productsModule from '../../modules/products';
import youtubeModule from '../../modules/youtube';

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
  typeDefs: [
    youtubeModule.typeDefs,
    productsModule.typeDefs,
    contributionsModule.typeDefs,
    typeDefs,
  ],
  resolvers: {
    Query: {
      ...contributionsModule.resolvers.Query,
      ...productsModule.resolvers.Query,
      ...youtubeModule.resolvers.Query,
      greet: () => 'Welcome to @devsoutinho/cms',
    },
    Mutation: {
      ...contributionsModule.resolvers.Mutation,
      ...productsModule.resolvers.Mutation,
      ...youtubeModule.resolvers.Mutation,
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
