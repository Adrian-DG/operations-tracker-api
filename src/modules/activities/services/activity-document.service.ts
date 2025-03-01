import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../entities/activity.entity';
import { ActivityDocument } from '../entities/activity-document.entity';
import { CreateActivityDocument } from '../dto/create-activity-document.dto';

@Injectable()
export class ActivityDocumentService {
  constructor(
    @InjectRepository(ActivityDocument)
    private readonly _repository: Repository<ActivityDocument>,
  ) {}

  async saveDocuments(documents: CreateActivityDocument[], activity: Activity) {
    const activityDocs = documents.map((document) =>
      this._repository.create({
        name: document.name,
        file: document.file,
        mimeType: document.mimeType,
        Activity: activity,
      }),
    );

    return this._repository.save(activityDocs);
  }
}
