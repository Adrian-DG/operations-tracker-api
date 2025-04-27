import { Module } from '@nestjs/common';
import { ReportService } from './services/report.service';
import { ActivitiesModule } from '../activities/activities.module';

@Module({
  imports: [ActivitiesModule],
  providers: [ReportService],
})
export class ReportsModule {}
