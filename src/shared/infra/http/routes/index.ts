import http from 'http';

import usersRouter from '@modules/users/infra/http/routes/usersRouter';
import sessionsRouter from '@modules/users/infra/http/routes/sessionsRouter';
import postsRouter from '@modules/posts/infra/http/routes/postsRouter';
import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';
import cors from '@shared/infra/http/middlewares/cors';
import AppError from '@shared/exceptions/AppError';

export default function routes(
  req: http.IncomingMessage, res: http.ServerResponse,
): Promise<void> | void {
  cors(req, res);

  process.on('unhandledRejection', (err: Error | AppError) => (
    globalExceptionHandlerMiddleware(err, req, res)
  ));

  if (req.method === 'OPTIONS') {
    res.end();

    return;
  }

  if (req.url?.match(/\/users\/*/)) {
    return usersRouter(req, res);
  }

  if (req.url?.match(/\/sessions\/*/)) {
    return sessionsRouter(req, res);
  }

  if (req.url?.match(/\/posts\/*/)) {
    return postsRouter(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({
    status: 'error',
    message: 'Endpoint not found',
  }));
}
