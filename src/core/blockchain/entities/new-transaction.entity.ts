import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/users.entity';

@Entity()
export class NewTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prevHash: string;

  @Column()
  hash: string;

  @Column()
  created_date: string;

  @Column({ nullable: true })
  nonce: number;

  @Column()
  data: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'userId' })
  user: User;
}
