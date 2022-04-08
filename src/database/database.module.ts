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
        const { url } = configurationService.postgres;
        return {
          type: 'postgres',
          url,
          synchronize: false,
          autoLoadEntities: true,
          logging: ['error'],
        };
      },
      inject: [Configuration.KEY],
    }),
  ],
})
export class DatabaseModule {}
