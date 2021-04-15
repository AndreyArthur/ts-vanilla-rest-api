import describe from '@shared/tests/describe';
import expect from '@shared/tests/expect';
import it from '@shared/tests/it';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUser';
import generateRandomString from '@shared/utils/generateRandomString';
import { compareHash } from '@modules/users/utils/passwordHash';
import AppError from '@shared/exceptions/AppError';
import writeTable from '@shared/database/utils/writeTable';
import database from '@shared/database';

describe('CreateUser', () => {
  writeTable(database.users, []);

  it('should create a user successfully', () => {
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

    const originalPassword = generateRandomString(8);

    const user = createUser.execute({
      name: generateRandomString(12),
      email: generateRandomString(16),
      password: originalPassword,
    });

    expect(compareHash(originalPassword, user.password));
  });

  writeTable(database.users, []);

  it('should throw an error because user already exists', () => {
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

    const originalPassword = generateRandomString(8);

    const user = createUser.execute({
      name: generateRandomString(12),
      email: generateRandomString(16),
      password: originalPassword,
    });

    try {
      createUser.execute({
        name: generateRandomString(12),
        email: user.email,
        password: generateRandomString(8),
      });
    } catch (err) {
      expect(err instanceof AppError);
    }
  });

  writeTable(database.users, []);
});
