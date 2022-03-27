import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@auth/services/auth.service';
import { UsersModule } from '@users/users.module';
import { AuthController } from '@auth/controllers/auth.controller';
import { LocalStrategy } from '@auth/local.strategy';
import { JwtStrategy } from '@auth/jwt.strategy';
import { jwtConstants } from '@auth/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
