import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrescriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    appointmentId: string;
    doctorId: string;
    diagnosis: string;
    medicines: string;
    notes?: string;
  }) {
    return this.prisma.prescription.create({ data });
  }

  findAll() {
    return this.prisma.prescription.findMany({
      include: { appointment: true, doctor: { include: { user: true } } },
    });
  }
}
