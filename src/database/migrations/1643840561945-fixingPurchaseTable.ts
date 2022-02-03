import {MigrationInterface, QueryRunner} from "typeorm";

export class fixingPurchaseTable1643840561945 implements MigrationInterface {
    name = 'fixingPurchaseTable1643840561945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" ADD "cart_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "cart_id"`);
    }

}
