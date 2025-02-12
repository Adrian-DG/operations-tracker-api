import { BaseEntityMetadata } from 'src/modules/shared/abstraction/base-entity-metadata.abstraction';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ActivityType } from './activity-type.entity';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ActivityImage } from './activity-image.entity';

@Entity({ name: 'activities' })
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

  @Column()
  status: ActivityStatus;

  @ManyToOne(() => ActivityType, (activityType) => activityType.activities)
  type: ActivityType;

  @OneToMany(() => ActivityImage, (activityImage) => activityImage.activity)
  images: ActivityImage[];
}
