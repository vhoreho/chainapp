import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { WalletReport } from 'src/core/wallet-report/wallet-report.entity';
import { UserRole } from 'src/enums/user-role.enum';
import { Wallet } from './wallet.entity';

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

  // Add a new property for the relation to the Wallet entity
  @OneToOne(() => Wallet)
  @JoinColumn() // You may need to specify options for the JoinColumn based on your requirements
  wallet: Wallet;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SIMPLE_USER,
    nullable: true,
  })
  role: UserRole;

  @OneToMany(() => WalletReport, (report) => report.user)
  reports: WalletReport[];
}
