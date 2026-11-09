import { Injectable } from '@nestjs/common';
import { AppointmentStatus, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    doctorId: string;
    patientId: string;
    appointment: string;
    note?: string;
  }) {
    return this.prisma.appointment.create({
      data: {
        doctorId: data.doctorId,
        patientId: data.patientId,
        appointment: new Date(data.appointment),
        note: data.note,
      },
    });
  }

  findAll(user: { id: string; role: Role }) {
    if (user.role === Role.ADMIN) {
      return this.prisma.appointment.findMany({
        include: {
          doctor: { include: { user: true } },
          patient: { include: { user: true } },
        },
      });
    }

    if (user.role === Role.DOCTOR) {
      return this.prisma.appointment.findMany({
        where: { doctor: { userId: user.id } },
        include: { patient: { include: { user: true } } },
      });
    }

    return this.prisma.appointment.findMany({
      where: { patient: { userId: user.id } },
      include: { doctor: { include: { user: true } } },
    });
  }

  updateStatus(id: string, status: AppointmentStatus) {
    return this.prisma.appointment.update({ where: { id }, data: { status } });
  }
}
