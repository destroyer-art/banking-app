import { IAuditableEntity } from "shared/domain/interfaces";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "customers" })
export class Customer implements IAuditableEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ unique: true, name: "gsm_number" })
  gsmNumber: string;

  @Column({ default: 100 })
  balance: number;

  @Column({ type: "date" })
  dateOfBirth: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "email_verified", default: false })
  emailVerified: boolean;

  verifyEmail(): void {
    this.emailVerified = true;
  }
}
