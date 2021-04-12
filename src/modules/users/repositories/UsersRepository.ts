import User from '@modules/users/models/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import database from '@shared/database';
import readTable from '@shared/utils/readTable';
import writeTable from '@shared/utils/writeTable';

export default class UsersRepository implements IUsersRepository {
  public create(
    { name, email, password }: Pick<User, 'name' | 'email' | 'password'>,
  ): User {
    return new User(name, email, password);
  }

  public save(user: User): void {
    const currentUsers = readTable(database.users) as unknown as User[];

    writeTable(database.users, [...currentUsers, user]);
  }

  public findByEmail(email: string): User | undefined {
    const users = readTable(database.users) as unknown as User[];

    return users.filter((user) => user.email === email)[0] || undefined;
  }

  public findById(id: string): User | undefined {
    const users = readTable(database.users) as unknown as User[];

    return users.filter((user) => user.id === id)[0] || undefined;
  }
}
