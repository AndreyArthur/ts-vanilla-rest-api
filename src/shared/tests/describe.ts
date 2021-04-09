// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function describe(message: string, callback: any): unknown {
  console.log('\x1b[36m', `Testing: ${message}`);

  return callback();
}
