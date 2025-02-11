import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity({ name: 'users' })
export class User extends BaseEntityMetadata {
  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];
}
