import fs from 'fs';

export default function writeTable(
  tableName: string, tableContent: unknown,
): void {
  return fs.writeFileSync(
    `${__dirname}/../database/${tableName}.json`, JSON.stringify(tableContent),
  );
}
