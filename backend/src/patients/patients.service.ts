import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto, UpdatePatientDto } from './patients.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}
  private fix(d: any) { return { ...d, ...(d.dateOfBirth && { dateOfBirth: new Date(d.dateOfBirth) }) }; }

  async create(dto: CreatePatientDto) {
    if (dto.cnic && (await this.prisma.patient.findUnique({ where: { cnic: dto.cnic } })))
      throw new ConflictException('A patient with this CNIC already exists');
    return this.prisma.patient.create({ data: this.fix(dto) });
  }
  search(q?: string) {
    if (!q) return this.prisma.patient.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
    const n = Number(q);
    return this.prisma.patient.findMany({ take: 50, where: { OR: [
      { fullName: { contains: q, mode: 'insensitive' } }, { cnic: { contains: q } }, { phone: { contains: q } },
      ...(Number.isInteger(n) ? [{ mrn: n }] : []) ] } });
  }
  async findOne(id: string) {
    const p = await this.prisma.patient.findUnique({ where: { id }, include: {
      appointments: { orderBy: { appointmentDate: 'desc' }, include: { doctor: true, prescriptions: true, payments: true } } } });
    if (!p) throw new NotFoundException('Patient not found');
    return p;
  }
  async update(id: string, dto: UpdatePatientDto) { await this.findOne(id); return this.prisma.patient.update({ where: { id }, data: this.fix(dto) }); }
}
