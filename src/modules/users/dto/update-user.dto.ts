import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  studentCode: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  github: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  facebook: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  class: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  generation: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  linkedIn: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;
}
