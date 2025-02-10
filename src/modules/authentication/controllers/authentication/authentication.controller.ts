import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { LoginUserDto } from '../../dto/login-user.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({ status: 200, description: 'User signed in' })
  async signIn(@Body() loginDto: LoginUserDto) {
    const result = await this._authService.signIn(
      loginDto.username,
      loginDto.password,
    );
    return result;
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({ status: 201, description: 'User signed up' })
  async signUp(@Body() registerDto: RegisterUserDto) {
    const result = await this._authService.signUp(registerDto);
    return result;
  }

  @Get('is-authenticated')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Check if user is authenticated' })
  checkAuthentication(@Req() request: Request) {
    return request['user'];
  }
}
