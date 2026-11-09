import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus } from '../generated/prisma/client';
import { CreateAppointmentDto } from './appointments.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id: dto.doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Patient not found');
    const when = new Date(dto.appointmentDate);
    const clash = await this.prisma.appointment.findFirst({
      where: { doctorId: dto.doctorId, appointmentDate: when, status: AppointmentStatus.BOOKED } });
    if (clash) throw new ConflictException('Doctor already has an appointment at this time');
    return this.prisma.appointment.create({
      data: { doctorId: dto.doctorId, patientId: dto.patientId, appointmentDate: when, reason: dto.reason,
              feePkr: dto.feePkr ?? doctor.consultationFeePkr },
      include: { doctor: true, patient: true } });
  }
  findAll(doctorId?: string, date?: string) {
    const start = date ? new Date(`${date}T00:00:00`) : undefined;
    const end = date ? new Date(`${date}T23:59:59.999`) : undefined;
    return this.prisma.appointment.findMany({
      where: { ...(doctorId && { doctorId }), ...(start && { appointmentDate: { gte: start, lte: end } }) },
      include: { doctor: true, patient: true, payments: true }, orderBy: { appointmentDate: 'asc' } });
  }
  async setStatus(id: string, status: AppointmentStatus) {
    if (!(await this.prisma.appointment.findUnique({ where: { id } }))) throw new NotFoundException('Appointment not found');
    return this.prisma.appointment.update({ where: { id }, data: { status } });
  }
}
