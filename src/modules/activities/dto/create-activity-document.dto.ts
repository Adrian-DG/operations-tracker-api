import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDocument {
  @ApiProperty()
  file: string;

  @ApiProperty()
  mimeType: string;
}
