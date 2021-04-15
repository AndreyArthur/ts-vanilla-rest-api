import fs from 'fs';

export default function createTableFiles(): void {
  const expectedTableFiles = [
    'users.json',
    'users.test.json',
    'posts.json',
    'posts.test.json',
  ];

  const missingTableFiles = expectedTableFiles
    .filter((file) => (
      !fs.readdirSync(`${__dirname}/../`).includes(file)
    ));

  return missingTableFiles.forEach((filename) => {
    fs.writeFileSync(`${__dirname}/../${filename}`, '[]');
  });
}
