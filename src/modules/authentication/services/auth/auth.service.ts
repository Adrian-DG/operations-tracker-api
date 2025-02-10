import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { use } from 'react';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly _userService: UserService) {}

  async signIn(registerDto: RegisterUserDto) {
    const user = await this._userService.findUser(registerDto.username);
    if (!user) throw new NotFoundException('User does not exist');

    // TODO: Implement password hash validation
    if (user.passwordHash !== registerDto.password)
      throw new BadRequestException('Invalid credentials');

    const { passwordHash, ...result } = user;

    return result;
  }
}
