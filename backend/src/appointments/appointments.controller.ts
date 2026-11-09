import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateStatusDto } from './appointments.dto';

@ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('appointments')
export class AppointmentsController {
  constructor(private s: AppointmentsService) {}
  @Get() findAll(@Query('doctorId') d?: string, @Query('date') date?: string) { return this.s.findAll(d, date); }
  @Post() create(@Body() d: CreateAppointmentDto) { return this.s.create(d); }
  @Patch(':id/status') setStatus(@Param('id') id: string, @Body() d: UpdateStatusDto) { return this.s.setStatus(id, d.status); }
}
