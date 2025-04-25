import { ActivityStatus } from 'src/modules/activities/enums/activity-status.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class $npmConfigName1745499991700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('auth', true);
    await queryRunner.createSchema('act', true);

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
            primaryKeyConstraintName: 'PK_User',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'passwordHash',
            type: 'varchar',
            comment: 'Hashed password',
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
            primaryKeyConstraintName: 'PK_User_Permission',
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
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
            name: 'FK_User_Permission_User',
            referencedTableName: 'auth.users',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
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
            primaryKeyConstraintName: 'PK_Activity_Type',
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
            primaryKeyConstraintName: 'PK_Activity_Subtype',
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
            name: 'FK_Activity_Subtype_ActivityType',
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
            primaryKeyConstraintName: 'PK_Activity',
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
            isNullable: true,
          },
          {
            name: 'location',
            type: 'nvarchar',
            isNullable: true,
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
            default: 1,
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
            name: 'FK_Activity_ActivityType',
            referencedTableName: 'act.activity_types',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
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
            primaryKeyConstraintName: 'PK_Activity_Document',
          },
          {
            name: 'activityId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'file',
            type: 'nvarchar',
            isNullable: false,
          },
          {
            name: 'mimeType',
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
            name: 'FK_Activity_Document_Activity',
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
      'act.activity_documents',
      'FK_Activity_Document_Activity',
    );
    await queryRunner.dropForeignKey(
      'act.activities',
      'FK_Activity_ActivityType',
    );
    await queryRunner.dropForeignKey(
      'act.activity_subtypes',
      'FK_Activity_Subtype_ActivityType',
    );
    await queryRunner.dropForeignKey(
      'auth.user_permissions',
      'FK_User_Permission_User',
    );

    await queryRunner.dropTable('act.activity_subtypes', true);
    await queryRunner.dropTable('act.activity_types', true);
    await queryRunner.dropTable('act.activity_documents', true);
    await queryRunner.dropTable('act.activities', true);

    await queryRunner.dropTable('auth.user_permissions', true);
    await queryRunner.dropTable('auth.users', true);
  }
}
