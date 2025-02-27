import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Activity } from './activity.entity';

@Entity({ name: 'activity_documents' })
export class ActivityDocument extends NamedEntity {
  @Column()
  file: string;

  @Column()
  mimeType: string;

  @ManyToOne(() => Activity, (activity) => activity.documents)
  Activity: Activity;
}
