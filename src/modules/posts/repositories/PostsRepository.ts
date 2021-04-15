import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import Post from '@modules/posts/models/Post';
import readTable from '@shared/database/utils/readTable';
import database from '@shared/database';
import writeTable from '@shared/database/utils/writeTable';

export default class PostsRepository implements IPostsRepository {
  public create(
    { title, content, user_id }: Pick<Post, 'title' | 'content' | 'user_id'>,
  ): Post {
    return new Post(title, content, user_id);
  }

  public save(post: Post): void {
    const posts = readTable(database.posts) as unknown as Post[];

    writeTable(database.posts, [...posts, post]);
  }
}
