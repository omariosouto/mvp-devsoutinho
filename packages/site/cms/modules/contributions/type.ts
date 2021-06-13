import { gql } from 'apollo-server-micro';
import { ContentLocale } from '../../server/handler/types';

export interface Contribution {
  _id: string;
  lang: ContentLocale;
  title: string;
  date: string;
  url: string;
  description: string;
  image?: string;
  // tags
  // category
}

export type QueryContributionInput = Pick<Contribution, '_id' | 'title'>;

export type NewContributionInput = Omit<Contribution, '_id'>;

export const typeDefs = gql`
  type Contribution {
    _id: String
    lang: ContentLocale
    title: String
    date: String
    url: String
    description: String
    image: String
  }

  input NewContributionInput {
    lang: ContentLocale!
    title: String!
    date: String!
    url: String!
    description: String!
    image: String
  }

  input QueryContributionInput {
    _id: String
    title: String
  }
  extend type Query {
    contributions(input: QueryContributionInput): [Contribution]!
    contribution(input: QueryContributionInput): Contribution
  }
  extend type Mutation {
    createContribution(input: NewContributionInput): Contribution
  }
`;
