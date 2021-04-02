import { gql } from 'apollo-server-micro';
// import { getDbConnection } from '../../infra/db/dbFactory';
import { Contribution } from './type';

// interface ContributionInput {
//   name: string;
// }

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
      // return getDbConnection().contributions.find({});
      return [
        {
          lang: 'pt-BR',
          date: '2021-03-26T03:00:00.000Z',
          name:
            'Como colocar seu projeto no ar DE GRAÇA via GitHub! | Hospedagem com GitHub Pages',
          description: '',
          url: 'https://www.youtube.com/watch?v=BU-w2_Aae54',
          _id: 'jaLdRohM2qMvWIOQ',
        },
      ];
    },
    async contribution(): // _: unknown,
    // { input }: { input: ContributionInput }
    Promise<Contribution> {
      // const result = await getDbConnection().contributions.findOne({
      //   ...input,
      // });
      return {
        lang: 'pt-BR',
        date: '2021-03-26T03:00:00.000Z',
        name:
          'Como colocar seu projeto no ar DE GRAÇA via GitHub! | Hospedagem com GitHub Pages',
        description: '',
        url: 'https://www.youtube.com/watch?v=BU-w2_Aae54',
        _id: 'jaLdRohM2qMvWIOQ',
      };
    },
  },
};

const contributionsModule = {
  typeDefs,
  resolvers,
};

export default contributionsModule;
