export class ActivityDetailModel {
  id: number;
  name: string;
  description: string;
  location: string;
  activityStatus: string;
  activityTypeId: number;
  activityTypeName: string;
  activitySubTypeId: number;
  activitySubTypeName: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
