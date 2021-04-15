import http from 'http';

import globalExceptionHandlerMiddleware
  from '@shared/infra/http/middlewares/globalExceptionHandler';
import getBody from '@shared/infra/http/middlewares/getBody';
import ensureAuthenticatedMiddleware
  from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import PostsRepository from '@modules/posts/repositories/PostsRepository';
import CreatePostService from '@modules/posts/services/CreatePost';
import validateFields from '@shared/infra/http/utils/validateFields';

export default class PostsController {
  public async create(
    req: http.IncomingMessage, res: http.ServerResponse,
  ): Promise<void> {
    try {
      const { user_id } = ensureAuthenticatedMiddleware(req, res);

      if (!user_id) { return; }

      const body = await getBody(req) as any;

      const usersRepository = new UsersRepository();
      const postsRepository = new PostsRepository();

      const createPost = new CreatePostService(
        postsRepository, usersRepository,
      );

      const post = createPost.execute(validateFields({
        title: '',
        content: '',
        user_id: '',
      }, { ...body, user_id }));

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(post));
    } catch (err) {
      globalExceptionHandlerMiddleware(err, req, res);
    }
  }
}
