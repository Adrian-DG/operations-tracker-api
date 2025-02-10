import { ConfigModuleOptions } from '@nestjs/config';

export const environmentConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
};
