import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { UserPermissionService } from '../user-permission/user-permission.service';

// https://medium.com/@awaisshaikh94/encrypting-passwords-in-nestjs-with-the-robust-hashing-mechanism-of-bcrypt-e052c7a499a3

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _userPermissionService: UserPermissionService,
  ) {}

  async signUp(payload: RegisterUserDto) {
    const { username, password, permissions } = payload;

    const user = await this._userService.findUser(username);

    if (user) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const savedUser = await this._userService.createUser({
      username,
      passwordHash: hashedPassword,
    } as User);

    await this._userPermissionService.assignPermissionsToUser(
      savedUser,
      permissions,
    );

    return { username: savedUser.username, id: savedUser.id };
  }

  async signIn(username: string, password: string) {
    const user = await this._userService.findUser(username);

    if (!user) throw new NotFoundException('User not found');

    const isPasswordCorrect = await compare(password, user.passwordHash);

    if (!isPasswordCorrect)
      throw new BadRequestException('Invalid credentials');

    const userPermissions =
      (await this._userPermissionService.getUserPermissions(user)) ?? [];

    const token = await this._jwtService.signAsync({
      id: user.id,
      username: user.username,
      permissions: userPermissions,
    });

    return { access_token: token };
  }
}
