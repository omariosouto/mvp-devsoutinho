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
      return getDbConnection().contributions.find({});
    },
    async contribution(
      _: unknown,
      { input }: { input: ContributionInput }
    ): Promise<Contribution> {
      const result = await getDbConnection().contributions.findOne({
        ...input,
      });
      return result;
    },
  },
};

const contributionsModule = {
  typeDefs,
  resolvers,
};

export default contributionsModule;
