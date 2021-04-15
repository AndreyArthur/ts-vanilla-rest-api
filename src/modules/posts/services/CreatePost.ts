import Post from '@modules/posts/models/Post';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/exceptions/AppError';

interface IRequest {
  title: string;
  content: string;
  user_id: string;
}

export default class CreatePostService {
  private postsRepository: IPostsRepository;

  private usersRepository: IUsersRepository;

  constructor(
    postsRepository: IPostsRepository,
    usersRepository: IUsersRepository,
  ) {
    this.postsRepository = postsRepository;
    this.usersRepository = usersRepository;
  }

  public execute({ title, content, user_id }: IRequest): Post {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can create a post', 401);
    }

    const post = this.postsRepository.create({ title, content, user_id });

    this.postsRepository.save(post);

    return post;
  }
}
