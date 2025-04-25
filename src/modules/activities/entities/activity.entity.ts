import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ActivityType } from './activity-type.entity';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ActivityDocument } from './activity-document.entity';
import { ActivitySubType } from './activity-subtype.entity';
import { User } from 'src/modules/authentication/entities/user.entity';

@Entity({ name: 'activities', schema: 'act' })
export class Activity extends BaseEntityMetadata {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column({ type: 'date', nullable: false, name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', nullable: false, name: 'end_date' })
  endDate: Date;

  @Column({
    type: 'nvarchar',
    name: 'activity_status',
    default: ActivityStatus.PENDING,
  })
  activityStatus: ActivityStatus;

  @Column({ type: 'int', nullable: false, name: 'activity_type_id' })
  activityTypeId: number;

  @JoinColumn({ name: 'activity_type_id' })
  @ManyToOne(() => ActivityType, (activityType) => activityType.activities, {
    cascade: false,
    eager: false,
    onDelete: 'NO ACTION',
  })
  activityType: ActivityType;

  @Column({ type: 'int', nullable: false, name: 'activity_sub_type_id' })
  activitySubTypeId: number;

  @JoinColumn({ name: 'activity_sub_type_id' })
  @ManyToOne(
    () => ActivitySubType,
    (activitySubType) => activitySubType.activities,
    { onDelete: 'NO ACTION', eager: false, cascade: false },
  )
  activitySubType: ActivitySubType;

  @OneToMany(() => ActivityDocument, (document) => document.activity, {
    eager: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  documents: ActivityDocument[];

  @Column({ name: 'created_by', type: 'int', nullable: false })
  createdBy: number;

  @JoinColumn({ name: 'created_by' })
  @ManyToOne(() => User, (user) => user.id, { eager: false })
  createdByUser: User;

  @Column({ name: 'updated_by', type: 'int', nullable: false })
  updatedBy: number;

  @JoinColumn({ name: 'updated_by' })
  @ManyToOne(() => User, (user) => user.id, { eager: false })
  updatedByUser: User;
}
