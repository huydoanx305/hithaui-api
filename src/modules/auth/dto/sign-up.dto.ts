import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(10)
  @IsNotEmpty()
  readonly studentCode: string;

  @IsString()
  @MaxLength(30)
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly email: string;
}
