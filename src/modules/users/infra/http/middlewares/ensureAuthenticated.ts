import http from 'http';

import { decode } from '@modules/users/utils/token';
import AppError from '@shared/exceptions/AppError';
import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';
import readEnvVariables from '@shared/utils/readEnvVariables';

export default function ensureAuthenticatedMiddleware(
  req: http.IncomingMessage, res: http.ServerResponse,
): void | any {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      throw new AppError('Token not provided', 401);
    }

    const [, token] = authHeader.split(' ');

    const { CRYPTO_SECRET } = readEnvVariables();

    const decoded = decode(token, CRYPTO_SECRET);

    return decoded;
  } catch (err) {
    if (err instanceof AppError) {
      globalExceptionHandlerMiddleware(err, req, res);

      return false;
    }

    try {
      throw new AppError('Invalid token', 401);
    } catch (error) {
      globalExceptionHandlerMiddleware(error, req, res);

      return false;
    }
  }
}
