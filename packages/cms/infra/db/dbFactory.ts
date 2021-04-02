import Datastore from 'nedb-promises-ts';
import { Contribution } from '../../modules/contributions/type';

interface DevSoutinhoDatabase {
  contributions: Datastore<Contribution>;
  // store: any;
}

export function getDbConnection(): DevSoutinhoDatabase {
  const contributions = new Datastore<Contribution>({
    filename: '_data/contributions.db',
    autoload: true,
  });
  const db: DevSoutinhoDatabase = {
    contributions,
  };

  return db;
}
