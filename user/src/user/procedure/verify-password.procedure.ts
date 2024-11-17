import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';

import { UserRepository } from '../user.repository';
import { promisifiedPbkdf2 } from '../utils/promisified-pbkdf2.util';

export class VerifyPasswordProcedure {
  logger = new Logger(VerifyPasswordProcedure.name);
  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: { id: string; password: string }) {
    this.logger.log('Starting verify-password-procedure');
    const user = await this.userRepository.findUserPasswordById(payload.id);

    const hashedPassword = await this.hashPassword(
      payload.password,
      user.passwordSalt,
    );

    await this.comparePassword(hashedPassword, user.passwordHash);

    this.logger.log('Successfully end verify-password-procedure');
    return true;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException('User not found');
    }
    this.logger.debug('Found user');
    this.logger.verbose(`${JSON.stringify(user)}`);
    return user;
  }

  async hashPassword(password: string, salt: string) {
    const hashedPasswordBuffer = await promisifiedPbkdf2(
      password,
      salt,
      100000,
      64,
      'sha512',
    );
    const hashedPassword = hashedPasswordBuffer.toString('hex');
    this.logger.debug('Create hashed password');
    return hashedPassword;
  }

  async comparePassword(password: string, hashPassword: string) {
    const isPasswordsEqual = password === hashPassword;
    if (!isPasswordsEqual) {
      this.logger.error('Passwords not match');
      throw new BadRequestException('Passwords not match');
    }
    this.logger.debug('Passwords match');
    return isPasswordsEqual;
  }
}
