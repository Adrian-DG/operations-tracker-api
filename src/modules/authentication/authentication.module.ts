import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './constants/jwt-constants.constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [AuthenticationController],
  exports: [AuthService],
})
export class AuthenticationModule {}
