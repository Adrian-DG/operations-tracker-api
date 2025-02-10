import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({ status: 200, description: 'User signed in' })
  async signIn(@Body() registerDto: RegisterUserDto) {
    const result = await this._authService.signIn(registerDto);
    return result;
  }
}
