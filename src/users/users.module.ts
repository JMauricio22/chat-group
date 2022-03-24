import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [ConfigService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
