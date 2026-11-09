import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { appointmentId: string; amount: number; method: string }) {
    return this.prisma.payment.create({ data });
  }

  findAll() {
    return this.prisma.payment.findMany({ include: { appointment: true } });
  }

  updateStatus(id: string, status: PaymentStatus) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status,
        paidAt: status === PaymentStatus.PAID ? new Date() : null,
      },
    });
  }
}
