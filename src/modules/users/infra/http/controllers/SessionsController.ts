import http from 'http';

import User from '@modules/users/models/User';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';
import CreateSessionService from '@modules/users/services/CreateSession';
import validateFields from '@shared/utils/validateFields';

export default class SessionsController {
  public create(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): http.IncomingMessage {
    let body: Pick<User, 'email' | 'password'> = {} as User;

    req.on('data', (chunck) => {
      body = JSON.parse(chunck.toString());
    });

    return req.on('end', () => {
      const usersRepository = new UsersRepository();

      const createSession = new CreateSessionService(usersRepository);

      let session = {} as { user: User, token: string };

      try {
        session = createSession.execute(validateFields({
          email: '%any%@%any%.%any%',
          password: '',
        }, body));
      } catch (err) {
        return globalExceptionHandlerMiddleware(err, req, res);
      }

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        user: {
          ...session.user,
          password: undefined,
        },
        token: session.token,
      }));
    });
  }
}
