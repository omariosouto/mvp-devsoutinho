import Datastore from 'nedb';
import path from 'path';
import allContributions from '../../../../_data/contributions';
import { Contribution } from '../../../modules/contributions/type';
import { createConfig, IS_PROD } from '../createConfig';

export function createContributionsCollection(): Datastore<Contribution> {
  const contributions = new Datastore<Contribution>(
    createConfig(path.resolve('./', '_data', 'contributions.db'))
  );
  if (IS_PROD)
    contributions.insert((allContributions as unknown) as Contribution[]);

  contributions.ensureIndex({ fieldName: 'url', unique: true });

  return contributions;
}
