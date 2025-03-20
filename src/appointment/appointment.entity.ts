import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  visitorEmail: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  allocatedTime: string;
}
