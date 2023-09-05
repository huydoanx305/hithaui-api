import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;
}
