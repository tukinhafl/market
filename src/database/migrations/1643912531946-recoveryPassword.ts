import {MigrationInterface, QueryRunner} from "typeorm";

export class recoveryPassword1643912531946 implements MigrationInterface {
    name = 'recoveryPassword1643912531946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_link" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_link"`);
    }

}
