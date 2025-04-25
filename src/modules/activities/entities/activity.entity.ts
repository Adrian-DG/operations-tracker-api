import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ActivityType } from './activity-type.entity';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ActivityDocument } from './activity-document.entity';
import { ActivitySubType } from './activity-subtype.entity';

@Entity({ name: 'activities', schema: 'act' })
export class Activity extends BaseEntityMetadata {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: ActivityStatus.PENDING })
  status: ActivityStatus;

  @ManyToOne(() => ActivityType, (activityType) => activityType.activities, {
    cascade: false,
    eager: false,
    onDelete: 'NO ACTION',
  })
  activityType: ActivityType;

  @ManyToOne(
    () => ActivitySubType,
    (activitySubType) => activitySubType.activities,
    { onDelete: 'NO ACTION', eager: false, cascade: false },
  )
  activitySubType: ActivitySubType;

  @OneToMany(() => ActivityDocument, (document) => document.activity, {
    eager: false,
    cascade: true,
  })
  documents: ActivityDocument[];
}
