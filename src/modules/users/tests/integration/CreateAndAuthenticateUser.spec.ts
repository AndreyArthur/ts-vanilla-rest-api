import http from 'http';

import describe from '@shared/tests/describe';
import it from '@shared/tests/it';
import generateRandomString from '@shared/utils/generateRandomString';
import User from '@modules/users/models/User';
import expect from '@shared/tests/expect';
import writeTable from '@shared/utils/writeTable';
import database from '@shared/database';

describe('CreateAndAuthenticateUser', () => {
  writeTable(database.users, []);

  it('should create a authenticate user successfully', async () => {
    const userPassword = generateRandomString(8);

    createUser({
      name: generateRandomString(16),
      email: generateRandomString(12),
      password: userPassword,
    });

    function createUser(
      userCredentials: Pick<User, 'name' | 'email' | 'password'>,
    ): void {
      const userRequest = http.request({
        host: 'localhost',
        port: 3333,
        method: 'POST',
        path: '/users/',
      }, (res: http.IncomingMessage) => {
        const chunks: any[] = [];

        res.on('data', (chunk) => chunks.push(chunk));

        res.on('end', () => {
          const user = JSON.parse(chunks.join(''));

          return createSession(user);
        });
      });

      userRequest.write(JSON.stringify(userCredentials));

      userRequest.end();
    }

    function createSession(createdUser: User): void {
      const sessionRequest = http.request({
        host: 'localhost',
        port: 3333,
        method: 'POST',
        path: '/sessions/',
      }, (res: http.IncomingMessage) => {
        const chunks: any[] = [];

        res.on('data', (chunk) => chunks.push(chunk));

        res.on('end', () => {
          const { user, token } = JSON.parse(chunks.join(''));

          return assert(user, token);
        });
      });

      sessionRequest.write(JSON.stringify({
        email: createdUser.email,
        password: userPassword,
      }));

      sessionRequest.end();
    }

    function assert(user: User, token: string): void {
      expect(!!token);
      expect(!!user);
    }
  });

  writeTable(database.users, []);
});
