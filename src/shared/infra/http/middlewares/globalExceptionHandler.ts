import http from 'http';

import AppError from '@shared/exceptions/AppError';

export default function globalExceptionHandlerMiddleware(
  err: Error, req: http.IncomingMessage, res: http.ServerResponse,
): void {
  if (err instanceof AppError) {
    res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'error', message: err.message }));
  }

  console.error(err);

  res.writeHead(500, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({
    status: 'error',
    message: 'Internal server error',
  }));
}
