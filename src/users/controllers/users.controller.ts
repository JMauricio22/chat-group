import { Controller, Put, Body, UseGuards, Request, Get } from '@nestjs/common';
import { UpdateUser } from '@auth/dtos/user.dtos';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import { UsersService } from '@users/services/users.service';

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
}
