import { NamedEntity } from 'src/modules/shared/abstraction/named-entity-metadata.abstraction';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';

@Entity({ name: 'activity_types' })
export class ActivityType extends NamedEntity {
  @OneToMany(() => Activity, (activity) => activity.type)
  activities: Activity[];
}
