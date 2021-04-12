import UTCDate from '@shared/utils/UTCDate';
import uuid from '@shared/utils/uuid';

export default class User {
  public readonly id: string;

  public readonly name: string;

  public readonly email: string;

  public readonly password: string;

  public readonly created_at: Date;

  public readonly updated_at: Date;

  constructor(name: string, email: string, password: string) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = UTCDate();
    this.updated_at = UTCDate();
  }
}
