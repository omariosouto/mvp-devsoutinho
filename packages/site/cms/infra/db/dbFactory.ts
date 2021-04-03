import Datastore from 'nedb';
import { Contribution } from '../../modules/contributions/type';

interface DevSoutinhoDatabase {
  contributions: Datastore<Contribution>;
}

export function getDbConnection(): DevSoutinhoDatabase {
  const contributions = new Datastore<Contribution>({
    filename: '_data/contributions.db',
    autoload: true,
  });
  contributions.ensureIndex({ fieldName: 'url', unique: true });

  const db: DevSoutinhoDatabase = {
    contributions,
  };

  return db;
}
