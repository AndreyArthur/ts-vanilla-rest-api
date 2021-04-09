import crypto from 'crypto';

export function createHash(text: string): string {
  const initialHash = crypto.createHash('sha256').update(text).digest('hex');

  let finalHash = '';

  initialHash.split('4').forEach((hashPart) => {
    finalHash += crypto.createHash('md5').update(hashPart).digest('hex');
  });

  finalHash = crypto.createHash('sha256').update(finalHash).digest('hex');

  return finalHash;
}

export function compareHash(text: string, hash: string): boolean {
  return createHash(text) === hash;
}
