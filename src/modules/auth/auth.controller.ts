import { User } from '@prisma/client';
import { AuthResponse } from '@common/types';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from '@common/decorators/auth.decorator';
import { AuthType } from '@common/enums/auth-type.enum';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { UserWithoutPassword } from '@common/types';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth(AuthType.Public)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Auth(AuthType.Public)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(signInDto);
  }

  @Get('me')
  getMe(@AuthUser() user: User): Promise<UserWithoutPassword> {
    return this.authService.getMe(user);
  }
}
