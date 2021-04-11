import http from 'http';

import UsersController
  from '@modules/users/infra/http/controllers/UsersController';
import AppError from '@shared/exceptions/AppError';

const usersController = new UsersController();

export default function usersRouter(
  req: http.IncomingMessage, res: http.ServerResponse,
): Promise<void> {
  if (req.method === 'POST') {
    return usersController.create(req, res);
  }

  throw new AppError('Endpoint not found', 404);
}
