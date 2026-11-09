import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(specialty?: string, city?: string) {
    return this.prisma.doctorProfile.findMany({
      where: {
        specialty: specialty
          ? { contains: specialty, mode: 'insensitive' }
          : undefined,
        user: {
          city: city ? { equals: city, mode: 'insensitive' } : undefined,
        },
      },
      include: {
        user: { select: { id: true, name: true, email: true, city: true } },
      },
    });
  }

  updateAvailability(id: string, availableFrom?: string, availableTo?: string) {
    return this.prisma.doctorProfile.update({
      where: { id },
      data: { availableFrom, availableTo },
    });
  }

  remove(id: string) {
    return this.prisma.doctorProfile.delete({ where: { id } });
  }
}
