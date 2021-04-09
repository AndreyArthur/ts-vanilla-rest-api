import generateRandomString from '@shared/utils/generateRandomString';

export default function uuid(): string {
  // eslint-disable-next-line max-len
  return `${generateRandomString(8)}-${generateRandomString(4)}-${generateRandomString(4)}-${generateRandomString(4)}-${generateRandomString(12)}`;
}
