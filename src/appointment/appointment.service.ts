import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async createAppointment(visitorEmail: string, date: string, allocatedTime: string) {
    const newAppointment = this.appointmentRepository.create({ visitorEmail, date, allocatedTime });
    return await this.appointmentRepository.save(newAppointment);
  }
}
