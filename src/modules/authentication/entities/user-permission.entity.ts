import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_permissions', schema: 'auth' })
export class UserPermission extends NamedEntity {
  @Column({ nullable: true })
  description: string;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.permissions)
  user: User;
}
