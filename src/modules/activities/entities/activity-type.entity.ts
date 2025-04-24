import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';
import { ActivitySubType } from './activity-subtype.entity';

@Entity({ name: 'activity_types', schema: 'act' })
export class ActivityType extends NamedEntity {
  @ManyToOne(() => Activity, (activity) => activity.type, {
    onDelete: 'NO ACTION',
    eager: false,
  })
  activity: Activity;

  @OneToMany(() => ActivitySubType, (subtype) => subtype.ActivityType, {
    onDelete: 'CASCADE',
    eager: true,
  })
  activitySubTypes: ActivitySubType[];
}
