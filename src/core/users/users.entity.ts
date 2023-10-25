import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WalletReport } from 'src/core/wallet-report/wallet-report.entity';
import { UserRole } from 'src/enums/user-role.enum';

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: true,
  })
  role: UserRole;

  @OneToMany(() => WalletReport, (report) => report.user)
  reports: WalletReport[];
}
