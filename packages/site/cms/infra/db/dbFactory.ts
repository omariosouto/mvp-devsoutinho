import Datastore from 'nedb';
import path from 'path';
import allContributions from '../../../_data/contributions.json';
import { Contribution } from '../../modules/contributions/type';
import fs from 'fs';

// const IS_PROD = process.env.NODE_ENV !== 'development';
const IS_PROD = false;

function createConfig(dbFilePath: string) {
  const base = {
    afterSerialization: (input) => {
      if (!IS_PROD) {
        const dbContent = fs.readFileSync(dbFilePath, { encoding: 'utf-8' });
        // TODO: mandar um writeFileSync
        // TODO: Colocar um trottle pra fazer a cada 1seg
        // eslint-disable-next-line no-console
        console.log(dbContent);
      }

      return input;
    },
    beforeDeserialization: (input) => input,
  };
  if (IS_PROD) return { ...base, inMemoryOnly: true };

  return {
    ...base,
    filename: dbFilePath,
    autoload: true,
  };
}
interface DevSoutinhoDatabase {
  contributions: Datastore<Contribution>;
}

function createContributionsCollection() {
  const contributions = new Datastore<Contribution>(
    createConfig(path.resolve('./', '_data', 'contributions.db'))
  );
  if (IS_PROD)
    contributions.insert((allContributions as unknown) as Contribution);
  contributions.ensureIndex({ fieldName: 'url', unique: true });
  return contributions;
}

export async function getDbConnection(): Promise<DevSoutinhoDatabase> {
  const db = {
    contributions: createContributionsCollection(),
  };

  return db;
}
