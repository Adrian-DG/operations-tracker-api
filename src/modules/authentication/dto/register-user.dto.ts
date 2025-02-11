import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Roles, { each: true })
  @ApiProperty({ enum: Roles, isArray: true, example: Object.values(Roles) })
  readonly roles: Roles[];
}
