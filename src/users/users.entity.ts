import { Report } from "src/reports/reports.entity";
import { AfterInsert, AfterUpdate, AfterRemove, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: true
  })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Array<Report>

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id', this.id);
  }
}