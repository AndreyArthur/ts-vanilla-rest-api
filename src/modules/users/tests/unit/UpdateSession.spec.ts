import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUser';
import UpdateSessionService from '@modules/users/services/UpdateSession';
import database from '@shared/database';
import AppError from '@shared/exceptions/AppError';
import describe from '@shared/tests/describe';
import expect from '@shared/tests/expect';
import it from '@shared/tests/it';
import generateRandomString from '@shared/utils/generateRandomString';
import uuid from '@shared/utils/uuid';
import writeTable from '@shared/utils/writeTable';

describe('UpdateSession', () => {
  writeTable(database.users, []);

  it('should update session successfully', () => {
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

    const createdUser = createUser.execute({
      name: generateRandomString(16),
      email: generateRandomString(12),
      password: generateRandomString(8),
    });

    const updateSession = new UpdateSessionService(usersRepository);

    const { user, token } = updateSession.execute({
      user_id: createdUser.id,
    });

    expect(!!token);
    expect(user.name === createdUser.name);
  });

  writeTable(database.users, []);

  it('should throw an error because given user does not exists', () => {
    const usersRepository = new UsersRepository();

    const updateSession = new UpdateSessionService(usersRepository);

    try {
      updateSession.execute({
        user_id: uuid(),
      });
    } catch (err) {
      expect(err instanceof AppError);
    }
  });
});
