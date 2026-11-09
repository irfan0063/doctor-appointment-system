import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.patientProfile.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, city: true } },
      },
    });
  }
}
