import { Injectable, NotFoundException } from '@nestjs/common';
import { IsArray, IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus } from '../generated/prisma/client';

export class CreatePrescriptionDto {
  @IsUUID() appointmentId: string;
  @IsString() diagnosis: string;
  @IsArray() medicines: { name: string; dose: string; days: number }[];
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) labTests?: string[];
  @IsOptional() @IsDateString() followUpDate?: string;
}

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreatePrescriptionDto) {
    if (!(await this.prisma.appointment.findUnique({ where: { id: dto.appointmentId } })))
      throw new NotFoundException('Appointment not found');
    const rx = await this.prisma.prescription.create({ data: {
      appointmentId: dto.appointmentId, diagnosis: dto.diagnosis, notes: dto.notes,
      medicines: dto.medicines as any, labTests: dto.labTests ?? [],
      followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined } });
    await this.prisma.appointment.update({ where: { id: dto.appointmentId }, data: { status: AppointmentStatus.COMPLETED } });
    return rx;
  }
  byPatient(patientId: string) {
    return this.prisma.prescription.findMany({ where: { appointment: { patientId } },
      include: { appointment: { include: { doctor: true } } }, orderBy: { createdAt: 'desc' } });
  }
}
