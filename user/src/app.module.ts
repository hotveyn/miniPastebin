import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { httpConfig } from './configuration/http.config';
import { postgresConfig } from './configuration/postgres.config';
import { redisConfig } from './configuration/redis.config';
import { KyselyModule } from './kysely/kysely.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig, redisConfig, httpConfig],
    }),
    UserModule,
    KyselyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
