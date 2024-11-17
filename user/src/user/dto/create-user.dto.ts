import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Insertable } from 'kysely';

import { Users } from '../../../gen/kysely/db';

export class CreateUserDto implements Pick<Insertable<Users>, 'username'> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsDefined()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @IsDefined()
  password: string;
}
