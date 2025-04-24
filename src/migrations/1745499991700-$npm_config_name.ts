import { ActivityStatus } from 'src/modules/activities/enums/activity-status.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class $npmConfigName1745499991700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('auth', true);
    await queryRunner.createSchema('act', true);

    await queryRunner.createDatabase('Operations_Tracker_DB', true);

    await queryRunner.createTable(
      new Table({
        name: 'auth.users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'passwordHash',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime2',
            default: 'GETDATE()',
          },
          {
            name: 'updatedAt',
            type: 'datetime2',
            default: 'GETDATE()',
            onUpdate: 'GETDATE()',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'auth.user_permissions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'permission',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime2',
            default: 'GETDATE()',
          },
          {
            name: 'updatedAt',
            type: 'datetime2',
            default: 'GETDATE()',
            onUpdate: 'GETDATE()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedTableName: 'auth.users',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'act.activity_types',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'GETDATE()',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'act.activity_subtypes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'activityTypeId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime2',
            isNullable: false,
            default: 'GETDATE()',
          },
          {
            name: 'updatedAt',
            type: 'datetime2',
            isNullable: false,
            default: 'GETDATE()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['activityTypeId'],
            referencedTableName: 'act.activity_types',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'act.activities',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'location',
            type: 'nvarchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'startDate',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'endDate',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'int',
            isNullable: false,
            enum: Object.values(ActivityStatus),
          },
          {
            name: 'typeId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'GETDATE()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['typeId'],
            referencedTableName: 'act.activity_types',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'act.activity_documents',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'activityId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'documentUrl',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'GETDATE()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['activityId'],
            referencedTableName: 'act.activities',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'act.activity_subtypes',
      'FK_activity_subtypes_activity_types',
    );
    await queryRunner.dropForeignKey(
      'act.activity_documents',
      'FK_activity_documents_activities',
    );

    await queryRunner.dropForeignKey(
      'act.activities',
      'FK_activities_activity_types',
    );

    await queryRunner.dropForeignKey(
      'auth.user_permissions',
      'FK_user_permissions_users',
    );
    await queryRunner.dropForeignKey(
      'auth.user_permissions',
      'FK_user_permissions_users',
    );

    await queryRunner.dropTable('act.activity_subtypes');
    await queryRunner.dropTable('act.activity_types');
    await queryRunner.dropTable('act.activity_documents');
    await queryRunner.dropTable('act.activities');

    await queryRunner.dropTable('auth.user_permissions');
    await queryRunner.dropTable('auth.users');
  }
}
