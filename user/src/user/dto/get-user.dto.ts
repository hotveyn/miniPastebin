import { IsUUID } from 'class-validator';
import { Selectable } from 'kysely';

import { Users } from '../../../gen/kysely/db';

export class GetUserDto implements Pick<Selectable<Users>, 'id'> {
  @IsUUID()
  id: string;
}
