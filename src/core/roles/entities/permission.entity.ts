import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permissionName: string;
}
