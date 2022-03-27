import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
  UseFilters,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { RegisterUser } from '../dtos/user.dtos';
import { QueryException } from '../../common/filters/QueryException';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseFilters(QueryException)
  @Post('register')
  async create(@Body() body: RegisterUser) {
    const user = await this.userService.create(body);
    return user;
  }
}
