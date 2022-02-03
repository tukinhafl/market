import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entities";
import { Purchase } from "./purchase.entities";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column()
  name!: string

  @Column()
  adm!: boolean

  @Column({ default: '' })
  reset_link!: string

  @OneToOne(type => Cart, { eager: true, onDelete: 'CASCADE' }) @JoinColumn()
  cart!: Cart

  @OneToMany(() => Purchase, purchase => purchase.owner)
  purchases!: Purchase[]
} 