import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDocument {
  @ApiProperty()
  name: string;

  @ApiProperty()
  file: string;

  @ApiProperty()
  mimeType: string;
}
