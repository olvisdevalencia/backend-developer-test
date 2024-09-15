import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity("products")
export class ProductEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ default: false })
  deleted: boolean = false;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
