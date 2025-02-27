import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserPermission } from '../../entities/user-permission.entity';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectRepository(UserPermission)
    private readonly _repository: Repository<UserPermission>,
  ) {}

  assignPermissionsToUser(user: User, permissions: string[]) {
    const userPermissions = permissions.map((permission) => {
      const userPermission = new UserPermission();
      userPermission.name = permission;
      userPermission.user = user;
      return userPermission;
    });
    return this._repository.save(userPermissions);
  }
}
