import { Module } from '@nestjs/common';

import { userProcedures } from './procedure';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, ...userProcedures],
})
export class UserModule {}
