import fs from 'fs';

export default function readTable(
  tableName: string,
): Record<string, unknown>[] {
  return JSON.parse(
    fs.readFileSync(`${__dirname}/../database/${tableName}.json`).toString(),
  );
}
