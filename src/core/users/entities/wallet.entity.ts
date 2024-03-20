import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm'; // Assuming you have a User entity
import { User } from './users.entity';
import { Transaction } from 'src/core/blockchain/entities/transaction.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  // Add a field for the relation to the User entity
  @OneToOne(() => User, (user) => user.wallet)
  user: User;

  // Define other properties of the wallet as needed

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transactions: Transaction[];
}
