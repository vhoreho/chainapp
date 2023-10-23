import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Roles } from './enum';
import { WalletReport } from 'src/wallet-report/wallet-report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  role: Roles;

  @OneToMany(() => WalletReport, (report) => report.user)
  reports: WalletReport[];
}
