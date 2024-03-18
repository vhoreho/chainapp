import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Wallet } from 'src/core/users/entities/wallet.entity';

@Entity()
export class NewTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  created_date: string;

  @Column({ nullable: true })
  nonce: number;

  @Column()
  coin: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'walletId' })
  wallet: Wallet;
}
