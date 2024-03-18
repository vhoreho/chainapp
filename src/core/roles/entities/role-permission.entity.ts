import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role)
  role: Role;

  @ManyToOne((type) => Permission)
  permission: Permission;
}
