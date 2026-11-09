import { Injectable, NotFoundException } from '@nestjs/common';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentMethod } from '../generated/prisma/client';

export class CreatePaymentDto {
  @IsUUID() appointmentId: string;
  @IsInt() @Min(1) amountPkr: number;
  @IsOptional() @IsEnum(PaymentMethod) method?: PaymentMethod;
  @IsOptional() @IsString() reference?: string;
}

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreatePaymentDto) {
    if (!(await this.prisma.appointment.findUnique({ where: { id: dto.appointmentId } })))
      throw new NotFoundException('Appointment not found');
    return this.prisma.payment.create({ data: dto });
  }
  byAppointment(appointmentId: string) { return this.prisma.payment.findMany({ where: { appointmentId } }); }
}
