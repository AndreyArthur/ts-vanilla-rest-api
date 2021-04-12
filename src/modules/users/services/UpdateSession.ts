import User from '@modules/users/models/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/exceptions/AppError';
import { sign } from '@modules/users/utils/token';
import readEnvVariables from '@shared/utils/readEnvVariables';

interface IRequest {
  user_id: string;
}

export default class UpdateSessionService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute(
    { user_id }: IRequest,
  ): {user: User, token: string} {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Token user does not exist');
    }

    const { CRYPTO_SECRET } = readEnvVariables();

    return {
      user,
      token: sign({ user_id }, CRYPTO_SECRET, 1000 * 60 * 60 * 24),
    };
  }
}
