import http from 'http';

import usersRouter from '@modules/users/infra/http/routes/usersRouter';
import sessionsRouter from '@modules/users/infra/http/routes/sessionsRouter';
import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';
import cors from '../middlewares/cors';

export default function routes(
  req: http.IncomingMessage, res: http.ServerResponse,
): Promise<void> | void {
  cors(req, res);

  try {
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

    res.writeHead(404, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify({
      status: 'error',
      message: 'Endpoint not found',
    }));
  } catch (err) {
    return globalExceptionHandlerMiddleware(err, req, res);
  }
}
