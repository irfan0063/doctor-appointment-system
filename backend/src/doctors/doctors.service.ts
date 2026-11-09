import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorDto, UpdateDoctorDto } from './doctors.dto';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}
  findAll(city?: string, specialty?: string) {
    return this.prisma.doctor.findMany({
      where: { isActive: true,
        ...(city && { city: { contains: city, mode: 'insensitive' } }),
        ...(specialty && { specialty: { contains: specialty, mode: 'insensitive' } }) },
      orderBy: { fullName: 'asc' } });
  }
  async findOne(id: string) {
    const d = await this.prisma.doctor.findUnique({
      where: { id },
      include: { reviews: { include: { patient: true }, orderBy: { createdAt: 'desc' } } },
    });
    if (!d) throw new NotFoundException('Doctor not found');
    return d;
  }
  create(dto: CreateDoctorDto) { return this.prisma.doctor.create({ data: dto }); }
  async update(id: string, dto: UpdateDoctorDto) { await this.findOne(id); return this.prisma.doctor.update({ where: { id }, data: dto }); }
  async remove(id: string) { await this.findOne(id); return this.prisma.doctor.update({ where: { id }, data: { isActive: false } }); }
}
