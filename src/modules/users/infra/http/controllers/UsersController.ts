import http from 'http';

import User from '@modules/users/models/User';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUser';
import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';
import validateFields from '@shared/utils/validateFields';

export default class UserController {
  public create(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): http.IncomingMessage {
    let body: Pick<User, 'name' | 'email' | 'password'> = {} as User;

    req.on('data', (chunck) => {
      body = JSON.parse(chunck.toString());
    });

    return req.on('end', () => {
      const usersRepository = new UsersRepository();

      const createUser = new CreateUserService(usersRepository);

      let user = {} as User;

      try {
        user = createUser.execute(validateFields({
          name: '',
          email: '%any%@%any%.%any%',
          password: '',
        }, body));
      } catch (err) {
        return globalExceptionHandlerMiddleware(err, req, res);
      }

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ...user, password: undefined }));
    });
  }
}
