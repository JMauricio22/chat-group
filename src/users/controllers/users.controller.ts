import {
  Controller,
  Put,
  Body,
  UseGuards,
  Request,
  Get,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UpdateUser } from '@auth/dtos/user.dtos';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import { UsersService } from '@users/services/users.service';
import { RegisterUser } from '@auth/dtos/user.dtos';
import { QueryException } from '@common/filters/QueryException';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() body: UpdateUser, @Request() req) {
    const { userId } = req.user;
    const updatedUser = await this.usersService.update(userId, body);
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    return user;
  }

  @UseFilters(QueryException)
  @Post('register')
  async create(@Body() body: RegisterUser) {
    const user = await this.usersService.create(body);
    return user;
  }
}
