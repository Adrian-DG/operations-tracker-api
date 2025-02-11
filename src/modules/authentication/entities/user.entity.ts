import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserPermission } from './user-permission.entity';

@Entity({ name: 'users' })
export class User extends BaseEntityMetadata {
  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  permissions: UserPermission[];
}
