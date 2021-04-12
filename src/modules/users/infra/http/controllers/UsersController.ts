import http from 'http';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUser';
import validateFields from '@shared/utils/validateFields';
import getBody from '@shared/infra/http/middlewares/getBody';
import parseQueryString from '@shared/utils/parseQueryString';
import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';
import SearchUsersService from '@modules/users/services/SearchUsers';

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

  public async index(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
    try {
      const query = parseQueryString(
        req.url?.split('?')[1] as unknown as string,
      );

      const usersRepository = new UsersRepository();

      const searchUsers = new SearchUsersService(usersRepository);

      const users = searchUsers.execute(query);

      const responseUsers = users.map((user) => (
        { ...user, password: undefined }
      ));

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(responseUsers));
    } catch (err) {
      globalExceptionHandlerMiddleware(err, req, res);
    }
  }
}
