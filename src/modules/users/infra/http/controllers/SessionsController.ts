import http from 'http';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateSessionService from '@modules/users/services/CreateSession';
import validateFields from '@shared/infra/http/utils/validateFields';
import getBody from '@shared/infra/http/middlewares/getBody';
import UpdateSessionService from '@modules/users/services/UpdateSession';
import ensureAuthenticatedMiddleware
  from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export default class SessionsController {
  public async create(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
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
  }

  public async update(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
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
  }
}
