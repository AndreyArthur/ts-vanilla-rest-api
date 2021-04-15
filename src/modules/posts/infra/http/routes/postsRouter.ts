import http from 'http';

import PostsController
  from '@modules/posts/infra/http/controllers/PostsController';
import AppError from '@shared/exceptions/AppError';

const postsController = new PostsController();

export default function postsRouter(
  req: http.IncomingMessage, res: http.ServerResponse,
): Promise<void> {
  if (req.method === 'POST') {
    return postsController.create(req, res);
  }

  throw new AppError('Endpoint not found', 404);
}
