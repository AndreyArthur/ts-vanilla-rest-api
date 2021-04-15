import http from 'http';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUser';
import validateFields from '@shared/infra/http/utils/validateFields';
import getBody from '@shared/infra/http/middlewares/getBody';
import parseQueryString from '@shared/infra/http/utils/parseQueryString';
import SearchUsersService from '@modules/users/services/SearchUsers';

export default class UserController {
  public async create(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
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
  }

  public async index(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
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
  }
}
