import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  link: string;

  @Column()
  category: string;

  @Column()
  source: string;

  @Column({ default: false })
  isApproved: boolean;
}
