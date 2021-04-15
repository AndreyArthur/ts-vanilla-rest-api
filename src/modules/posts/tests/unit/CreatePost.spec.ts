import describe from '@shared/tests/describe';
import it from '@shared/tests/it';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import CreatePostService from '@modules/posts/services/CreatePost';
import CreateUserService from '@modules/users/services/CreateUser';
import generateRandomString from '@shared/utils/generateRandomString';
import expect from '@shared/tests/expect';
import writeTable from '@shared/database/utils/writeTable';
import database from '@shared/database';
import PostsRepository from '@modules/posts/repositories/PostsRepository';
import uuid from '@shared/utils/uuid';
import AppError from '@shared/exceptions/AppError';

describe('CreatePost', () => {
  writeTable(database.posts, []);
  writeTable(database.users, []);

  it('should create a post successfully', () => {
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({
      name: generateRandomString(16),
      email: generateRandomString(12),
      password: generateRandomString(8),
    });

    const postsRepository = new PostsRepository();

    const createPost = new CreatePostService(postsRepository, usersRepository);

    const post = createPost.execute({
      title: generateRandomString(12),
      content: generateRandomString(32),
      user_id: user.id,
    });

    expect(post.user_id === user.id);
    expect(typeof post.content === 'string');
  });

  writeTable(database.posts, []);
  writeTable(database.users, []);

  it(
    'should throw an error because user that creates the post is not '
    + 'authenticated',
    () => {
      const usersRepository = new UsersRepository();
      const postsRepository = new PostsRepository();

      const createPost = new CreatePostService(
        postsRepository, usersRepository,
      );

      try {
        createPost.execute({
          title: generateRandomString(12),
          content: generateRandomString(32),
          user_id: uuid(),
        });
      } catch (err) {
        expect(err instanceof AppError);
      }
    },
  );

  writeTable(database.posts, []);
  writeTable(database.users, []);
});
