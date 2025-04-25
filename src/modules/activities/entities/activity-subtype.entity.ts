import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ActivityType } from './activity-type.entity';
import { Activity } from './activity.entity';

@Entity({ name: 'activity_subtypes', schema: 'act' })
export class ActivitySubType extends NamedEntity {
  @Column({ name: 'activity_type_id', type: 'int', nullable: false })
  activityTypeId: number;

  @JoinColumn({ name: 'activity_type_id' })
  @ManyToOne(
    () => ActivityType,
    (activityType) => activityType.activitySubTypes,
    {
      onDelete: 'CASCADE',
      eager: false,
      cascade: false,
    },
  )
  activityType: ActivityType;

  @OneToMany(() => Activity, (activity) => activity.activitySubType)
  activities: Activity[];
}
