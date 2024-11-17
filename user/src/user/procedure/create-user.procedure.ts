import { randomBytes } from 'node:crypto';

import { Injectable, Logger } from '@nestjs/common';
import { Insertable } from 'kysely';

import { Users } from '../../../gen/kysely/db';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../user.repository';
import { promisifiedPbkdf2 } from '../utils/promisified-pbkdf2.util';

@Injectable()
export class CreateUserProcedure {
  logger = new Logger(CreateUserProcedure.name);
  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: CreateUserDto) {
    try {
      this.logger.debug('Starting create-user-procedure');

      const { hashPassword, salt } = await this.hashPassword(payload.password);

      const user = await this.createUser({
        username: payload.username,
        passwordHash: hashPassword,
        passwordSalt: salt,
      });
      this.logger.debug('Successfully end create-user-procedure');
      return user;
    } catch (error) {
      this.logger.error(
        'Error occured while creating-user-procedure execution',
      );
      throw error;
    }
  }

  async hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hashedPasswordBuffer = await promisifiedPbkdf2(
      password,
      salt,
      100000,
      64,
      'sha512',
    );
    const hashPassword = hashedPasswordBuffer.toString('hex');
    this.logger.debug('Create hashed password');
    return { hashPassword, salt };
  }

  async createUser(payload: Insertable<Users>) {
    const user = await this.userRepository.createUser(payload);
    this.logger.debug(`Created new user`);
    this.logger.verbose(`${JSON.stringify(user)}`);
    return user;
  }
}
