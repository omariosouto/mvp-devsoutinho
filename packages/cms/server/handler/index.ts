  
import {
    ApolloServer,
    gql,
    makeExecutableSchema
  } from 'apollo-server-micro';
  
  const typeDefs = gql`
    type Query {
      greet: String
    }
  `;
  
  export const schema = makeExecutableSchema({
    typeDefs: [
      typeDefs,
    ],
    resolvers: {
      Query: {
        greet: () => 'Welcome to @devsoutinho/cms',
      },
    },
  });
  
  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
  });
  
  export function handler(req, res) {
    server.createHandler({
      path: '/api/graphql/',
    })(req,res);
  }