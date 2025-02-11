import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './constants/jwt-constants.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRoleService } from './services/user-role/user-role.service';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, AuthService, UserRoleService],
  controllers: [AuthenticationController],
  exports: [AuthService],
})
export class AuthenticationModule {}
