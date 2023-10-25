// wallet-report.entity.ts
import { User } from 'src/core/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import WalletCrimes from './enum/wallet-crimes';

@Entity()
export class WalletReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reportDate: Date;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  wasInvolvedInIllegalActivity: boolean;

  @Column({ type: 'enum', enum: WalletCrimes, default: WalletCrimes.Other })
  crimeType: WalletCrimes;

  @Column({ nullable: true })
  crimeDescription: string;

  @Column({ nullable: true })
  walletAddress: string;
}
