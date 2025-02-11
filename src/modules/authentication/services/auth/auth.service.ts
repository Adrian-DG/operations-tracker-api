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

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(payload: RegisterUserDto) {
    const { username, password } = payload;

    const user = await this._userService.findUser(username);

    if (user) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const newUser = await this._userService.createUser({
      username,
      passwordHash: hashedPassword,
    } as User);

    return { username: newUser.username, id: newUser.id };
  }

  async signIn(username: string, password: string) {
    const user = await this._userService.findUser(username);

    if (!user) throw new NotFoundException('User not found');

    const isPasswordCorrect = await compare(password, user.passwordHash);

    if (!isPasswordCorrect)
      throw new BadRequestException('Invalid credentials');

    const token = await this._jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    return { access_token: token };
  }
}
