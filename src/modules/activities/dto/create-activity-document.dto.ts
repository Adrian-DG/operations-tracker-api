import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsMimeType, IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityDocument {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsDataURI()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Base64 encoded file',
  })
  file: string;

  @IsMimeType()
  @ApiProperty({
    type: 'string',
    default: 'application/pdf',
    description: 'MIME type of the file',
  })
  mimeType: string;
}
