import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_roles' })
export class UserRole extends NamedEntity {
  @ManyToOne(() => User, (user) => user.roles)
  user: User;
}
