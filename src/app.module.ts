import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import { DatabaseModule } from '@database/database.module';
import { ChannelsModule } from '@channels/channels.module';
import { AuthModule } from '@auth/auth.module';
import Configuration from '@config/configuration';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    DatabaseModule,
    ChannelsModule,
    AuthModule,
  ],
})
export class AppModule {}
