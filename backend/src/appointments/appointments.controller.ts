import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppointmentStatus, Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AppointmentsService } from './appointments.service';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Roles(Role.ADMIN, Role.PATIENT)
  @Post()
  create(
    @Body()
    body: {
      doctorId: string;
      patientId: string;
      appointment: string;
      note?: string;
    },
  ) {
    return this.appointmentsService.create(body);
  }

  @Roles(Role.ADMIN, Role.DOCTOR, Role.PATIENT)
  @Get()
  findAll(@Req() req: { user: { id: string; role: Role } }) {
    return this.appointmentsService.findAll(req.user);
  }

  @Roles(Role.ADMIN, Role.DOCTOR)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: AppointmentStatus },
  ) {
    return this.appointmentsService.updateStatus(id, body.status);
  }
}
