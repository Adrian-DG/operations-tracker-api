import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';

@Module({
  providers: [UserService, AuthService]
})
export class UserModule {}
