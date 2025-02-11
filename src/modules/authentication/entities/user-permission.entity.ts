import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_permissions' })
export class UserPermission extends NamedEntity {
  @ManyToOne(() => User, (user) => user.permissions)
  user: User;
}
