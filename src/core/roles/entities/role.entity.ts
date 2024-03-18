import { USER_ROLE } from 'src/enums/user-role.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.SIMPLE_USER,
    nullable: true,
  })
  roleName: USER_ROLE;
}
