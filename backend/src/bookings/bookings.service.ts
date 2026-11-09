import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, UpdateBookingDto } from './bookings.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    const [doctor, patient] = await Promise.all([
      this.prisma.doctor.findUnique({ where: { id: dto.doctorId } }),
      this.prisma.patient.findUnique({ where: { id: dto.patientId } }),
    ]);
    if (!doctor) throw new NotFoundException('Doctor not found');
    if (!patient) throw new NotFoundException('Patient not found');
    return this.prisma.booking.create({
      data: { ...dto, bookingDate: new Date(dto.bookingDate) },
      include: { doctor: true, patient: true, appointment: true },
    });
  }

  findAll(doctorId?: string, patientId?: string) {
    return this.prisma.booking.findMany({
      where: { ...(doctorId && { doctorId }), ...(patientId && { patientId }) },
      include: { doctor: true, patient: true, appointment: true },
      orderBy: { bookingDate: 'asc' },
    });
  }

  async updateStatus(id: string, dto: UpdateBookingDto) {
    if (!(await this.prisma.booking.findUnique({ where: { id } })))
      throw new NotFoundException('Booking not found');
    return this.prisma.booking.update({ where: { id }, data: { status: dto.status } });
  }
}
