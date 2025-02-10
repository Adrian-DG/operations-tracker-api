import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntityMetadata {
  @Column()
  username: string;

  @Column()
  passwordHash: string;
}
