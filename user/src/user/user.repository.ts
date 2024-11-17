import { Inject, Injectable } from '@nestjs/common';
import { Insertable, Kysely, Selectable } from 'kysely';

import { DB, Users } from '../../gen/kysely/db';
import { KYSELY } from '../kysely/kysely.module';

@Injectable()
export class UserRepository {
  constructor(@Inject(KYSELY) private readonly kysely: Kysely<DB>) {}

  async findUserById(id: Pick<Selectable<Users>, 'id'>['id']) {
    return await this.kysely
      .selectFrom('users')
      .where('id', '=', id)
      .select(['createdAt', 'id', 'updatedAt', 'username'])
      .executeTakeFirst();
  }

  async findUserPasswordById(id: Pick<Selectable<Users>, 'id'>['id']) {
    return await this.kysely
      .selectFrom('users')
      .where('id', '=', id)
      .select(['passwordSalt', 'passwordHash'])
      .executeTakeFirst();
  }

  createUser(payload: Insertable<Users>) {
    return this.kysely
      .insertInto('users')
      .values(payload)
      .returning(['createdAt', 'id', 'updatedAt', 'username'])
      .executeTakeFirst();
  }

  updateUser(id: string, payload: Insertable<Users>) {
    return this.kysely
      .updateTable('users')
      .set(payload)
      .where('id', '=', id)
      .returning(['createdAt', 'id', 'updatedAt', 'username'])
      .executeTakeFirst();
  }
}
