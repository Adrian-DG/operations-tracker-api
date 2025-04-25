import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ActivityType } from './activity-type.entity';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ActivityDocument } from './activity-document.entity';

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

  @ManyToOne(() => ActivityType, (activityType) => activityType.activity, {
    eager: true,
    onDelete: 'NO ACTION',
    nullable: false,
  })
  type: ActivityType;

  @OneToMany(
    () => ActivityDocument,
    (activityDocument) => activityDocument.Activity,
    {
      eager: true,
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  documents: ActivityDocument[];
}
