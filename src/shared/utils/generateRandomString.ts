import crypto from 'crypto';

export default function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex').slice(length);
}
