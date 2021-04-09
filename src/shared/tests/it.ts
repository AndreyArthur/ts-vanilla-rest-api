// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function it(message: string, callback: any): unknown {
  console.log('\x1b[34m', `  It: ${message}`);

  console.log('\x1b[37m');

  return callback();
}
