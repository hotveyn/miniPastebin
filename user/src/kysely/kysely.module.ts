import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { DB } from '../../gen/kysely/db';
import { postgresConfig } from '../configuration/postgres.config';

export const KYSELY = Symbol('Kysely');

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      inject: [postgresConfig.KEY],
      provide: KYSELY,
      useFactory: (config: ConfigType<typeof postgresConfig>) => {
        const dialect = new PostgresDialect({
          pool: new Pool({
            database: config.database,
            host: config.host,
            user: config.username,
            password: config.password,
            port: config.port,
            max: 10,
          }),
        });

        return new Kysely<DB>({
          dialect,
          plugins: [new CamelCasePlugin()],
        });
      },
    },
  ],
  exports: [KYSELY],
})
export class KyselyModule {}
