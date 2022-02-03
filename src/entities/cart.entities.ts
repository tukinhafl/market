import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entities";

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToMany(type => Product, { eager: true, onDelete: 'CASCADE' }) @JoinTable()
  products!: Product[]
} 