import { Injectable, Logger } from '@nestjs/common';

import { UserRepository } from '../user.repository';

@Injectable()
export class GetUserProcedure {
  logger = new Logger(GetUserProcedure.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: { id: string }) {
    try {
      this.logger.debug('Starting get-user-procedure');

      const user = await this.getUser(payload.id);

      this.logger.debug('Successfully end get-user-procedure');
      return user;
    } catch (error) {
      this.logger.error('Error occured while get-user-procedure execution');
      throw error;
    }
  }

  async getUser(id: string) {
    const user = await this.userRepository.findUserById(id);
    this.logger.debug(`Found user`);
    this.logger.verbose(`${JSON.stringify(user)}`);
    return user;
  }
}
