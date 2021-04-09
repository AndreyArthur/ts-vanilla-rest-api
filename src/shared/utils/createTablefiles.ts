import fs from 'fs';

export default function createTableFiles(): void {
  const expectedTableFiles = ['users.json', 'users.test.json', '.gitkeep'];

  const missingTableFiles = expectedTableFiles
    .filter((file) => (
      !fs.readdirSync(`${__dirname}/../database`).includes(file)
    ));

  return missingTableFiles.forEach((filename) => {
    fs.writeFileSync(`${__dirname}/../database/${filename}`, '[]');
  });
}
