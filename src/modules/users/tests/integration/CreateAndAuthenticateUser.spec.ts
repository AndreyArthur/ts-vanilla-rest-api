import http from 'http';

import describe from '@shared/tests/describe';
import it from '@shared/tests/it';
import generateRandomString from '@shared/utils/generateRandomString';
import User from '@modules/users/models/User';
import expect from '@shared/tests/expect';
import writeTable from '@shared/utils/writeTable';
import database from '@shared/database';
import getBody from '@shared/infra/http/middlewares/getBody';

describe('CreateAndAuthenticateUser', () => {
  writeTable(database.users, []);

  it('should create a authenticate user successfully', async () => {
    const userPassword = generateRandomString(8);

    const createdUser = await new Promise((resolve) => {
      const userRequest = http.request({
        host: 'localhost',
        port: 3333,
        method: 'POST',
        path: '/users/',
      }, async (res: http.IncomingMessage) => {
        const body = await getBody(res) as unknown as User;

        resolve(body);
      });

      userRequest.write(JSON.stringify({
        name: generateRandomString(16),
        email: `${
          generateRandomString(4)
        }@${
          generateRandomString(4)
        }.${
          generateRandomString(4)}`,
        password: userPassword,
      }));

      userRequest.end();
    }) as User;

    const { user, token } = await new Promise((resolve) => {
      const sessionRequest = http.request({
        host: 'localhost',
        port: 3333,
        method: 'POST',
        path: '/sessions/',
      }, async (res: http.IncomingMessage) => {
        const body = await getBody(
          res,
        ) as unknown as {user: User, token: string};

        resolve(body);
      });

      sessionRequest.write(JSON.stringify({
        email: createdUser.email,
        password: userPassword,
      }));

      sessionRequest.end();
    }) as {user: User, token: string};

    expect(!!token);
    expect(user.name === createdUser.name);
  });

  writeTable(database.users, []);
});
