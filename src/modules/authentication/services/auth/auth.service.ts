import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as security from '../../helpers/security.helper';
import { User } from '../../entities/user.entity';
import { compare } from 'bcrypt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(registerDto: RegisterUserDto) {
    console.log(registerDto);
    const usernameHash = await security.hash(registerDto.username);

    if (await this._userService.findUser(usernameHash))
      throw new BadRequestException('User already exists');

    const [encryptedusername, encryptedPassword] = await Promise.all([
      security.encrypt(registerDto.username),
      security.encrypt(registerDto.password),
    ]);

    const user = await this._userService.createUser({
      username: encryptedusername,
      passwordHash: encryptedPassword,
    } as User);

    return { ...registerDto, password: '' };
  }

  async signIn(username: string, password: string) {
    const usernameHash = await security.hash(username);
    const user = await this._userService.findUser(usernameHash);

    if (!user) throw new NotFoundException('User not found');

    if (!(await compare(password, user.passwordHash)))
      throw new BadRequestException('Invalid password');

    const decryptedUsername = await security.decrypt(user.username);
    const payload = { username: decryptedUsername, sub: user.id };
    const token = this._jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { access_token: token };
  }
}
