import fs from 'fs';

export default function writeTable(
  tableName: string, tableContent: unknown,
): void {
  return fs.writeFileSync(
    `${__dirname}/../${tableName}.json`, JSON.stringify(tableContent),
  );
}
