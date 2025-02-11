import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { LoginUserDto } from '../../dto/login-user.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'User signed in' })
  async signIn(@Body() payload: LoginUserDto) {
    const result = await this._authService.signIn(
      payload.username,
      payload.password,
    );
    return result;
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 201, description: 'User signed up' })
  async signUp(@Body() payload: RegisterUserDto) {
    const result = await this._authService.signUp(payload);
    return result;
  }

  @Get('is-authenticated')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Check if user is authenticated' })
  checkAuthentication(@Req() request: Request) {
    return request['user'];
  }
}
