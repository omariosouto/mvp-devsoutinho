import { getDbConnection } from '../../infra/db/dbFactory';
import { idGenerator } from '../../infra/db/idGenerator';
import {
  Contribution,
  NewContributionInput,
  QueryContributionInput,
  typeDefs,
} from './type';

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
      { input }: { input: QueryContributionInput }
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
  Mutation: {
    async createContribution(
      _: unknown,
      { input }: { input: NewContributionInput }
    ): Promise<Contribution> {
      const contribution: Contribution = {
        ...input,
        _id: idGenerator(),
        date: new Date(input.date).toISOString(),
      };

      return new Promise((resolve, reject) =>
        getDbConnection().contributions.insert(contribution, (err, data) => {
          if (err) reject(err);
          resolve(data);
        })
      );
    },
  },
};

const contributionsModule = {
  typeDefs,
  resolvers,
};

export default contributionsModule;
