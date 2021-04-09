import User from '@modules/users/models/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/exceptions/AppError';
import * as token from '@modules/users/utils/token';
import readEnvVariables from '@shared/utils/readEnvVariables';
import { compareHash } from '@modules/users/utils/passwordHash';

interface IRequest {
  email: string;
  password: string;
}

export default class CreateSessionService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute(
    { email, password }: IRequest,
  ): {user: User, token: string} {
    const user = this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email/password combination');
    }

    const passwordMatch = compareHash(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid email/password combination');
    }

    return {
      user,
      token: token.sign(
        { user_id: user.id },
        readEnvVariables().CRYPTO_SECRET,
        1000 * 60 * 60 * 24,
      ),
    };
  }
}
