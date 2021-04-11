import http from 'http';

import SessionsController
  from '@modules/users/infra/http/controllers/SessionsController';
import AppError from '@shared/exceptions/AppError';

const sessionsController = new SessionsController();

export default function sessionsRouter(
  req: http.IncomingMessage, res: http.ServerResponse,
): Promise<void> {
  if (req.method === 'POST') {
    return sessionsController.create(req, res);
  }

  throw new AppError('Endpoint not found', 404);
}
