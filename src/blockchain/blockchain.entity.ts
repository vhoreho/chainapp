import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlockChain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prevHash: string;

  @Column()
  hash: string;

  @Column()
  created_date: string;

  @Column()
  nonce: number;

  @Column()
  data: string;
}
