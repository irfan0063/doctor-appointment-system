import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { CreatePrescriptionDto, PrescriptionsService } from './prescriptions.service';

@ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Controller('prescriptions')
export class PrescriptionsController {
  constructor(private s: PrescriptionsService) {}
  @Roles('DOCTOR', 'ADMIN') @Post() create(@Body() d: CreatePrescriptionDto) { return this.s.create(d); }
  @Get('patient/:patientId') byPatient(@Param('patientId') id: string) { return this.s.byPatient(id); }
}
