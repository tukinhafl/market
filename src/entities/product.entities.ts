import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  name!: string

  @Column()
  price!: number
} 