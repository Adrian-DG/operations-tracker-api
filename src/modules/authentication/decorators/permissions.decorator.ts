import { SetMetadata } from '@nestjs/common';
import { Permissions as PermissionEnum } from '../enums/Permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const HasPermissions = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
