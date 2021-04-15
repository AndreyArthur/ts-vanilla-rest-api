import uuid from '@shared/utils/uuid';
import UTCDate from '@shared/utils/UTCDate';

export default class Post {
  public readonly id: string;

  public readonly title: string;

  public readonly content: string;

  public readonly user_id: string;

  public readonly created_at: Date;

  public readonly updated_at: Date;

  constructor(title: string, content: string, user_id: string) {
    this.id = uuid();
    this.title = title;
    this.content = content;
    this.user_id = user_id;
    this.created_at = UTCDate();
    this.updated_at = UTCDate();
  }
}
