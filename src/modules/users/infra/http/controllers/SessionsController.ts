import http from 'http';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateSessionService from '@modules/users/services/CreateSession';
import validateFields from '@shared/utils/validateFields';
import getBody from '@shared/infra/http/middlewares/getBody';
import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';
import UpdateSessionService from '@modules/users/services/UpdateSession';
import ensureAuthenticatedMiddleware from '../middlewares/ensureAuthenticated';

export default class SessionsController {
  public async create(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
    try {
      const body = await getBody(req);

      const usersRepository = new UsersRepository();

      const createSession = new CreateSessionService(usersRepository);

      const session = createSession.execute(validateFields({
        email: '%any%@%any%.%any%',
        password: '',
      }, body));

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        user: {
          ...session.user,
          password: undefined,
        },
        token: session.token,
      }));
    } catch (err) {
      return globalExceptionHandlerMiddleware(err, req, res);
    }
  }

  public async update(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
    try {
      const content = ensureAuthenticatedMiddleware(req, res);

      if (!content) { return; }

      const usersRepository = new UsersRepository();

      const updateSession = new UpdateSessionService(usersRepository);

      const { user, token } = updateSession.execute({
        user_id: content.user_id,
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        user: { ...user, password: undefined },
        token,
      }));
    } catch (err) {
      return globalExceptionHandlerMiddleware(err, req, res);
    }
  }
}
