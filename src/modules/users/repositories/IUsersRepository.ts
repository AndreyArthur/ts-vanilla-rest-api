import User from '@modules/users/models/User';

interface IUsersRepository {
  create(
    { name, email, password }: Pick<User, 'name' | 'email' | 'password'>
  ): User;
  save(user: User): void;
  findByEmail(email: string): User | undefined;
  findById(id: string): User | undefined;
  search(credentials: Partial<Pick<User, 'id'| 'name' | 'email'>>): User[];
}

export default IUsersRepository;
