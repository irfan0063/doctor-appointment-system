import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { PrescriptionsService } from './prescriptions.service';

@ApiTags('prescriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Roles(Role.ADMIN, Role.DOCTOR)
  @Post()
  create(
    @Body()
    body: {
      appointmentId: string;
      doctorId: string;
      diagnosis: string;
      medicines: string;
      notes?: string;
    },
  ) {
    return this.prescriptionsService.create(body);
  }

  @Roles(Role.ADMIN, Role.DOCTOR, Role.PATIENT)
  @Get()
  findAll() {
    return this.prescriptionsService.findAll();
  }
}
