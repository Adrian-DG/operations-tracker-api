import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { AuthenticationController } from './controllers/authentication/authentication.controller';

@Module({
  providers: [UserService, AuthService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
