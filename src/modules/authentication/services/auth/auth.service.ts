import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn(registerDto: RegisterUserDto) {
    const user = await this._userService.findUser(registerDto.username);
    if (!user) throw new NotFoundException('User does not exist');

    // TODO: Implement password hash validation
    if (user.passwordHash !== registerDto.password)
      throw new BadRequestException('Invalid credentials');

    const payload = { username: user.username, sub: user.id };

    return { access_token: await this._jwtService.signAsync(payload) };
  }
}
