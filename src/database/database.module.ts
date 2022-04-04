import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Configuration from '@config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configurationService: ConfigType<typeof Configuration>,
      ) => {
        const { host, port, username, password, dbName } =
          configurationService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
          logging: ['query', 'error'],
        };
      },
      inject: [Configuration.KEY],
    }),
  ],
})
export class DatabaseModule {}
