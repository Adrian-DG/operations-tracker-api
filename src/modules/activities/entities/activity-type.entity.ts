import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';
import { ActivitySubType } from './activity-subtype.entity';

@Entity({ name: 'activity_types' })
export class ActivityType extends NamedEntity {
  @OneToMany(() => ActivitySubType, (subtype) => subtype.ActivityType, {
    eager: true,
  })
  activitySubTypes: ActivitySubType[];
}
