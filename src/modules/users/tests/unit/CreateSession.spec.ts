import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateSessionService from '@modules/users/services/CreateSession';
import CreateUserService from '@modules/users/services/CreateUser';
import database from '@shared/database';
import AppError from '@shared/exceptions/AppError';
import describe from '@shared/tests/describe';
import expect from '@shared/tests/expect';
import it from '@shared/tests/it';
import generateRandomString from '@shared/utils/generateRandomString';
import writeTable from '@shared/utils/writeTable';

describe('CreateSession', () => {
  writeTable(database.users, []);

  it('should create a session sucessfully', () => {
    const usersRepository = new UsersRepository();

    const createSession = new CreateSessionService(usersRepository);

    const createUser = new CreateUserService(usersRepository);

    const originalPassword = generateRandomString(8);

    const createdUser = createUser.execute({
      name: generateRandomString(16),
      email: generateRandomString(12),
      password: originalPassword,
    });

    const { user, token } = createSession.execute({
      email: createdUser.email,
      password: originalPassword,
    });

    expect(typeof token === 'string');
    expect(user.name === createdUser.name);
  });

  writeTable(database.users, []);

  it('should throw an error because given user not exists', () => {
    const usersRepository = new UsersRepository();

    const createSession = new CreateSessionService(usersRepository);

    try {
      createSession.execute({
        email: generateRandomString(12),
        password: generateRandomString(8),
      });
    } catch (err) {
      expect(err instanceof AppError);
    }
  });

  writeTable(database.users, []);

  it('should throw an error because user password is wrong', () => {
    const usersRepository = new UsersRepository();

    const createSession = new CreateSessionService(usersRepository);

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({
      name: generateRandomString(16),
      email: generateRandomString(12),
      password: generateRandomString(8),
    });

    try {
      createSession.execute({
        email: user.email,
        password: generateRandomString(8),
      });
    } catch (err) {
      expect(err instanceof AppError);
    }
  });

  writeTable(database.users, []);
});
