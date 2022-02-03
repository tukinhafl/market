import {MigrationInterface, QueryRunner} from "typeorm";

export class purchaseTable1643839830594 implements MigrationInterface {
    name = 'purchaseTable1643839830594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchasedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_6b7d9f8ff70ac82cfa05b7edcad" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_6b7d9f8ff70ac82cfa05b7edcad"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
    }

}
