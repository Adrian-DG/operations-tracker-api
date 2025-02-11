import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Permissions } from '../enums/Permissions.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsArray({ message: 'Permissions must be an array', each: false })
  @ArrayNotEmpty()
  @ApiProperty({
    type: String,
    isArray: true,
    example: Object.values(Permissions),
  })
  readonly permissions: Permissions[];
}
