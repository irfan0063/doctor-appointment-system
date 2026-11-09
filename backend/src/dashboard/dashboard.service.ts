import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}
  async summary() {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end = new Date(); end.setHours(23, 59, 59, 999);
    const [patients, doctors, today, revenue] = await Promise.all([
      this.prisma.patient.count(),
      this.prisma.doctor.count({ where: { isActive: true } }),
      this.prisma.appointment.count({ where: { appointmentDate: { gte: start, lte: end } } }),
      this.prisma.payment.aggregate({ _sum: { amountPkr: true }, where: { paidAt: { gte: start, lte: end } } }),
    ]);
    return { totalPatients: patients, totalDoctors: doctors, appointmentsToday: today, revenueTodayPkr: revenue._sum.amountPkr ?? 0 };
  }
}
