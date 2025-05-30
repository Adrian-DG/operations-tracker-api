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
            type: 'nvarchar',
            length: '50',
            isNullable: false,
            isUnique: true,
            comment: 'Unique username for the user',
          },
          {
            name: 'passwordHash',
            type: 'nvarchar',
            comment: 'Hashed password',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
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
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'nvarchar',
            isNullable: false,
            length: '150',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'nvarchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'GETDATE()',
            onUpdate: 'GETDATE()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            name: 'FK_User_Permission_User',
            referencedTableName: 'auth.users',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
          },
        ],
        indices: [
          {
            columnNames: ['user_id'],
            name: 'IDX_User_Permission_User',
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
            isUnique: true,
            comment: 'Unique name for the activity type',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
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
            isUnique: true,
            comment: 'Unique name for the activity subtype',
          },
          {
            name: 'activity_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
            default: 'GETDATE()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['activity_type_id'],
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
            length: '150',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'nvarchar',
            isNullable: true,
            length: '255',
          },
          {
            name: 'location',
            type: 'nvarchar',
            isNullable: true,
            length: '255',
          },
          {
            name: 'start_date',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'activity_status',
            type: 'nvarchar',
            isNullable: false,
            default: `'PENDIENTE'`,
            comment: 'Status of the activity',
          },
          {
            name: 'activity_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'activity_sub_type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'created_by',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'updated_by',
            type: 'int',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['created_by'],
            name: 'FK_Activity_User_Creator',
            referencedTableName: 'auth.users',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
          },
          {
            columnNames: ['updated_by'],
            name: 'FK_Activity_User_Updater',
            referencedTableName: 'auth.users',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
          },
          {
            columnNames: ['activity_type_id'],
            name: 'FK_Activity_ActivityType',
            referencedTableName: 'act.activity_types',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
          },
          {
            columnNames: ['activity_sub_type_id'],
            name: 'FK_Activity_Sub_ActivityType',
            referencedTableName: 'act.activity_subtypes',
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
            name: 'activity_id',
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
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'created_by',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'updated_by',
            type: 'int',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['created_by'],
            name: 'FK_Activity_Document_User_Creator',
            referencedTableName: 'auth.users',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
          },
          {
            columnNames: ['updated_by'],
            name: 'FK_Activity_Document_User_Updater',
            referencedTableName: 'auth.users',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
          },
          {
            columnNames: ['activity_id'],
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
