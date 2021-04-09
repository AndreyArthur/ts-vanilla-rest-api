import AppError from '@shared/exceptions/AppError';

import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

function encrypt(text: string, secretKey: string): string {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
}

function decrypt(text: string, secretKey: string): string {
  const hash = {
    iv: text.split('.')[0],
    content: text.split('.')[1],
  };

  const decipher = crypto.createDecipheriv(
    algorithm, secretKey, Buffer.from(hash.iv, 'hex'),
  );

  const decrpyted = Buffer.concat(
    [decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()],
  );

  return decrpyted.toString();
}

interface IToken {
  expiresIn: number;
  content: any;
}

export function sign(
  content: Record<string, unknown>, secret: string, expiration: number,
): string {
  return encrypt(JSON.stringify({
    expiresIn: Date.now() + expiration,
    content,
  }), secret);
}

export function decode(token: string, secret: string): IToken {
  try {
    const decoded = JSON.parse(decrypt(token, secret));

    if (Date.now() > decoded.expiresIn) {
      throw new AppError('Expired token', 401);
    }

    return decoded.content;
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
