import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../../entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly _repository: Repository<UserRole>,
  ) {}

  assignRolesToUser(user: User, roles: string[]) {
    return this._repository.save(
      roles.map((role) => {
        const userRole = new UserRole();
        userRole.name = role;
        userRole.user = user;
        return userRole;
      }),
    );
  }
}
