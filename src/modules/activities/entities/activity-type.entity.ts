import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';
import { ActivitySubType } from './activity-subtype.entity';

@Entity({ name: 'activity_types', schema: 'act' })
export class ActivityType extends NamedEntity {
  @OneToMany(() => ActivitySubType, (subType) => subType.activityType, {
    eager: false,
    cascade: true,
  })
  activitySubTypes: ActivitySubType[];

  @OneToMany(() => Activity, (activity) => activity.activityType)
  activities: Activity[];
}
