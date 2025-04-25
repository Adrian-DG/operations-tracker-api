import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Activity } from './activity.entity';

@Entity({ name: 'activity_documents', schema: 'act' })
export class ActivityDocument extends NamedEntity {
  @Column({ type: 'nvarchar', length: 255 })
  file: string;

  @Column({ type: 'nvarchar', length: 60 })
  mimeType: string;

  @ManyToOne(() => Activity, (activity) => activity.documents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: false,
    cascade: false,
  })
  activity: Activity;
}
