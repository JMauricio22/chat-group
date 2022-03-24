import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUser } from '../dtos/user.dtos';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUser) {
    const user = await this.usersService.create(body);
    return user;
  }
}
