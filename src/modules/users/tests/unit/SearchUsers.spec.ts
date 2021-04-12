import User from '@modules/users/models/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUser';
import SearchUsersService from '@modules/users/services/SearchUsers';
import database from '@shared/database';
import describe from '@shared/tests/describe';
import expect from '@shared/tests/expect';
import it from '@shared/tests/it';
import generateRandomString from '@shared/utils/generateRandomString';
import writeTable from '@shared/utils/writeTable';

describe('SearchUsers', () => {
  writeTable(database.users, []);

  function createRandomUser(usersRepository: IUsersRepository): User {
    const createUser = new CreateUserService(usersRepository);

    return createUser.execute({
      name: generateRandomString(16),
      email: generateRandomString(12),
      password: generateRandomString(8),
    });
  }

  it('should find all users', () => {
    const usersRepository = new UsersRepository();

    createRandomUser(usersRepository);
    createRandomUser(usersRepository);
    createRandomUser(usersRepository);
    createRandomUser(usersRepository);
    createRandomUser(usersRepository);

    const searchUsers = new SearchUsersService(usersRepository);

    const users = searchUsers.execute({});

    expect(users.length === 5);
  });

  writeTable(database.users, []);

  it('should find two especific users', () => {
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

    createUser.execute({
      name: generateRandomString(16),
      email: 'obito@obito.com',
      password: generateRandomString(8),
    });
    createUser.execute({
      name: 'Itachi',
      email: generateRandomString(12),
      password: generateRandomString(8),
    });
    createRandomUser(usersRepository);
    createRandomUser(usersRepository);
    createRandomUser(usersRepository);

    const searchUsers = new SearchUsersService(usersRepository);

    const users = searchUsers.execute({
      name: 'Itachi',
      email: 'obito',
    });

    expect(users.length === 2);
  });

  writeTable(database.users, []);

  it('should find a single user by id', () => {
    const usersRepository = new UsersRepository();

    const userToBeSearched = createRandomUser(usersRepository);
    createRandomUser(usersRepository);
    createRandomUser(usersRepository);

    const searchUsers = new SearchUsersService(usersRepository);

    const users = searchUsers.execute({
      id: userToBeSearched.id,
    });

    expect(users.length === 1);
    expect(users[0].name === userToBeSearched.name);
  });

  writeTable(database.users, []);
});
