import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  nationalId: string;

  @Column({ type: 'text' })
  personalDetails: string;
}
