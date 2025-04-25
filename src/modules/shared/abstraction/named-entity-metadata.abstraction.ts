import { Column } from 'typeorm';
import { BaseEntityMetadata } from './base-entity-metadata.abstraction';

export abstract class NamedEntity extends BaseEntityMetadata {
  @Column({ nullable: false, unique: true })
  name: string;
}
