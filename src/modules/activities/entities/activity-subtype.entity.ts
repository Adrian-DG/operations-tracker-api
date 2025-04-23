import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Entity, ManyToOne } from 'typeorm';
import { ActivityType } from './activity-type.entity';

@Entity({ name: 'activity_subtypes' })
export class ActivitySubType extends NamedEntity {
  @ManyToOne(
    () => ActivityType,
    (activityType) => activityType.activitySubTypes,
    { eager: true },
  )
  ActivityType: ActivityType;
}
