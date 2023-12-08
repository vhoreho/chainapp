import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WalletReport } from 'src/core/wallet-report/wallet-report.entity';
import { USER_ROLE } from 'src/enums/user-role.enum';
import { Transaction } from '../blockchain/transaction.entity';

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

  @Column({ nullable: true })
  publicKey: string;

  @Column({ nullable: true })
  walletAddress: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.USER,
    nullable: true,
  })
  role: USER_ROLE;

  @OneToMany(() => WalletReport, (report) => report.user)
  reports: WalletReport[];

  @OneToMany(() => Transaction, (blockchain) => blockchain.user)
  blockchain: Transaction[];
}
