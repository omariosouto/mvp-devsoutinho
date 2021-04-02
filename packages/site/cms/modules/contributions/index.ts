import { gql } from 'apollo-server-micro';
import { getDbConnection } from '../../infra/db/dbFactory';
import { Contribution } from './type';

interface ContributionInput {
  name: string;
}

const typeDefs = gql`
  type Contribution {
    _id: String
    lang: String
    url: String!
    date: String!
    name: String!
    slug: String!
    description: String
  }
  input ContributionInput {
    _id: String
    name: String
  }

  extend type Query {
    contributions(input: ContributionInput): [Contribution]!
    contribution(input: ContributionInput): Contribution
  }
`;

const resolvers = {
  Query: {
    async contributions(): Promise<Contribution[]> {
      return new Promise((resolve, reject) =>
        getDbConnection().contributions.find({}, (err, data) => {
          if (err) reject(err);
          resolve(data);
        })
      );
    },
    async contribution(
      _: unknown,
      { input }: { input: ContributionInput }
    ): Promise<Contribution> {
      return new Promise((resolve, reject) =>
        getDbConnection().contributions.findOne(
          {
            ...input,
          },
          (err, data) => {
            if (err) reject(err);
            resolve(data);
          }
        )
      );
    },
  },
};

const contributionsModule = {
  typeDefs,
  resolvers,
};

export default contributionsModule;
