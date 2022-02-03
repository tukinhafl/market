import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn()
  purchasedAt!: Date

  @Column()
  cart_id!: string

  @ManyToOne(() => User, user => user.purchases)
  owner!: User

} 