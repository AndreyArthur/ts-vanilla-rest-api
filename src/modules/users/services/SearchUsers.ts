import User from '@modules/users/models/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id?: string;
  name?: string;
  email?: string;
}

export default class SearchUsersService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ id, name, email }: IRequest): User[] {
    const users = this.usersRepository.search({ id, name, email });

    return users;
  }
}
