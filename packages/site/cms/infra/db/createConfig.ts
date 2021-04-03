import debounce from 'lodash/debounce';
import fs from 'fs';

export const IS_PROD = process.env.NODE_ENV !== 'development';

const delayDbWrite = debounce((dbFilePath: string) => {
  const dbContent = fs.readFileSync(dbFilePath, { encoding: 'utf-8' });
  const dbContentNormalized = dbContent
    .split('\n')
    .filter((dbContentLine) => !dbContentLine.includes('$$indexCreated'));

  fs.writeFileSync(
    dbFilePath.replace('.db', '.ts'),
    `/* eslint-disable prettier/prettier */
export default [${dbContentNormalized.join(',')}]`,
    { encoding: 'utf-8' }
  );
}, 1000);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createConfig(dbFilePath: string) {
  const base = {
    afterSerialization: (input) => {
      if (!IS_PROD) delayDbWrite(dbFilePath);
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
