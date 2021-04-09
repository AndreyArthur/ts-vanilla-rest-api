/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import fs from 'fs';

export default function readEnvVariables(): any {
  return fs.readFileSync(`${__dirname}/../../../.env`)
    .toString()
    .trim()
    .split('\n')
    .reduce((acc, curr) => (
      acc = { ...acc, [curr.split('=')[0]]: curr.split('=')[1] }
    ), {});
}
