import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './constants/jwt-constants.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPermission } from './entities/user-permission.entity';
import { UserPermissionService } from './services/user-permission/user-permission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPermission]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, AuthService, UserPermissionService],
  controllers: [AuthenticationController],
  exports: [AuthService],
})
export class AuthenticationModule {}
