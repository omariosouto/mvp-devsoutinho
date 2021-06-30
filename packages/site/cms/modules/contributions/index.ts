/* eslint-disable no-console */
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
      const conn = await getDbConnection();
      return new Promise((resolve, reject) =>
        conn.contributions
          .find({})
          .sort({ date: -1 })
          .exec((err, data) => {
            if (err) reject(err);
            resolve(data);
          })
      );
    },
    async contribution(
      _: unknown,
      { input }: { input: QueryContributionInput }
    ): Promise<Contribution> {
      const conn = await getDbConnection();
      return new Promise((resolve, reject) =>
        conn.contributions.findOne(
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
      const conn = await getDbConnection();
      const contribution: Contribution = {
        ...input,
        _id: idGenerator(),
        date: new Date(input.date).toISOString(),
      };

      return new Promise((resolve, reject) =>
        conn.contributions.insert(contribution, (err, data) => {
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
