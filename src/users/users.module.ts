import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@users/services/users.service';
import { User } from '@users/entities/user.entity';
import { UsersController } from '@users/controllers/users.controller';

@Module({
  imports: [ConfigService, TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
