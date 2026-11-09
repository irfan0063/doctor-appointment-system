import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto) {
    const [doctor, patient] = await Promise.all([
      this.prisma.doctor.findUnique({ where: { id: dto.doctorId } }),
      this.prisma.patient.findUnique({ where: { id: dto.patientId } }),
    ]);
    if (!doctor) throw new NotFoundException('Doctor not found');
    if (!patient) throw new NotFoundException('Patient not found');
    return this.prisma.review.create({ data: dto, include: { patient: true } });
  }

  byDoctor(doctorId: string) {
    return this.prisma.review.findMany({
      where: { doctorId },
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
