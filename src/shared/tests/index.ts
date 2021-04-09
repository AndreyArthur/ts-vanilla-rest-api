/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';

function getTestFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });

  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);

    return dirent.isDirectory() ? getTestFiles(res) : res;
  });

  return Array.prototype.concat(...files)
    .filter((file) => file.indexOf('.spec.ts') > -1);
}

getTestFiles(`${__dirname}/../../`).forEach(async (file) => {
  await require(file);
});
