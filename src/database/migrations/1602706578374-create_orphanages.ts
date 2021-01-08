import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602706578374 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'orphanages',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					generationStrategy: 'increment',
				},
				{
					name: 'name',
					type: 'varchar',
				},
				{
					name: 'latitude',
					type: 'varchar',
				},
				{
					name: 'longitude',
					type: 'varchar',
				},
				{
					name: 'about',
					type: 'text'
				},
				{
					name: 'instructions',
					type: 'text'
				},
				{
					name: 'opening_hours',
					type: 'varchar'
				},
				{
					name: 'open_on_weekends',
					type: 'boolean',
					default: false
				},
				{ 
					name: 'pending',
					type: 'boolean',
					default: true
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('orphanages')
	}

}