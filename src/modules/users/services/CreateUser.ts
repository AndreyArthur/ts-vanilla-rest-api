import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/models/User';
import AppError from '@shared/exceptions/AppError';
import { createHash } from '@modules/users/utils/passwordHash';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ name, email, password }: IRequest): User {
    const userExists = this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password: createHash(password),
    });

    this.usersRepository.save(user);

    return user;
  }
}
