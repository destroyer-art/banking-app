import { IAuditableEntity } from "shared/domain/interfaces";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "customers" })
export class Customer implements IAuditableEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "first_name", default: "firstName" })
  firstName: string;

  @Column({ name: "last_name", default: "lastName" })
  lastName: string;

  @Column({ name: "gsm_number", default: "gsmNumber" })
  gsmNumber: string;

  @Column({ default: 100 })
  balance: number;

  @CreateDateColumn({ name: "date_of_birth", type: "timestamp with time zone" })
  dateOfBirth: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: Date;
}
