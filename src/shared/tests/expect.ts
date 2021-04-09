import assert from 'assert';

export default function expect(condition: boolean): void {
  try {
    return assert(condition);
  } catch (err) {
    console.error('\x1b[31m', err);
  }
}
