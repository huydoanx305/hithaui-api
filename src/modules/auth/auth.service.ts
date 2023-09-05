import { exclude } from '@common/utils';
import { PrismaService } from '@modules/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthResponse, SignTokenPayload } from '@common/types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserWithoutPassword } from '@common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const { studentCode, password, name, email } = signUpDto;

    const user = await this.prismaService.user.findUnique({
      where: { studentCode },
    });
    if (user) {
      throw new BadRequestException('User existed');
    }

    const saltOrRounds = 7;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        studentCode,
        password: hashPassword,
      },
    });

    const payload = { userId: newUser.id };
    const accessToken = await this.generateAccessToken(payload);

    return {
      accessToken,
    };
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    const { username, password } = signInDto;
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            studentCode: username,
          },
          {
            email: username,
          },
        ],
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { userId: user.id };
    const accessToken = await this.generateAccessToken(payload);

    return {
      accessToken,
    };
  }

  async generateAccessToken(payload: SignTokenPayload): Promise<string> {
    const secret = this.configService.get<string>('jwt.secret');
    const expiresIn = this.configService.get<string>('jwt.expiresIn');

    const options = {
      secret,
      expiresIn,
    };

    return this.jwtService.signAsync(payload, options);
  }

  async getMe(user: User): Promise<UserWithoutPassword> {
    return exclude(user, ['password']);
  }
}
