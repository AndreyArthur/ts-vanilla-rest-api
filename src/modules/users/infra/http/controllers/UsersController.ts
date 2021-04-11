import http from 'http';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUser';
import validateFields from '@shared/utils/validateFields';
import getBody from '@shared/infra/http/middlewares/getBody';
import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';

export default class UserController {
  public async create(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
    try {
      const body = await getBody(req);

      const usersRepository = new UsersRepository();

      const createUser = new CreateUserService(usersRepository);

      const user = createUser.execute(validateFields({
        name: '',
        email: '%any%@%any%.%any%',
        password: '',
      }, body));

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ...user, password: undefined }));
    } catch (err) {
      globalExceptionHandlerMiddleware(err, req, res);
    }
  }
}
