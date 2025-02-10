import { ConfigModuleOptions } from '@nestjs/config';

export const ENVIRONMENT_CONFIG: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
};
