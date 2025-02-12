import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Activity } from './activity.entity';

@Entity({ name: 'activity_images' })
export class ActivityImage extends BaseEntityMetadata {
  @Column({ type: 'blob' })
  image: Buffer;

  @ManyToOne(() => Activity, (activity) => activity.images)
  activity: Activity;
}
