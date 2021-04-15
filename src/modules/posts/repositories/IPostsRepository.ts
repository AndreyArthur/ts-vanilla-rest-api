import Post from '@modules/posts/models/Post';

interface IPostsRepository {
  create(credentials: Pick<Post, 'title' | 'content' | 'user_id'>): Post;
  save(post: Post): void;
}

export default IPostsRepository;
