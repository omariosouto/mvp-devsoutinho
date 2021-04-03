import Datastore from 'nedb';
import path from 'path';
import { Contribution } from '../../modules/contributions/type';
import { createConfig, IS_PROD } from './createConfig';
import allContributions from '../../../_data/contributions';

interface DevSoutinhoDatabase {
  contributions: Datastore<Contribution>;
}

function createContributionsCollection() {
  const contributions = new Datastore<Contribution>(
    createConfig(path.resolve('./', '_data', 'contributions.db'))
  );
  if (IS_PROD)
    contributions.insert((allContributions as unknown) as Contribution[]);

  contributions.ensureIndex({ fieldName: 'url', unique: true });

  return contributions;
}

export async function getDbConnection(): Promise<DevSoutinhoDatabase> {
  const db = {
    contributions: createContributionsCollection(),
  };

  return db;
}
