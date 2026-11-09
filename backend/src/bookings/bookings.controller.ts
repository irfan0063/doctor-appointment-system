import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './bookings.dto';

@ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Controller('bookings')
export class BookingsController {
  constructor(private service: BookingsService) {}
  @Get() findAll(@Query('doctorId') doctorId?: string, @Query('patientId') patientId?: string) {
    return this.service.findAll(doctorId, patientId);
  }
  @Roles('ADMIN', 'RECEPTIONIST') @Post() create(@Body() dto: CreateBookingDto) { return this.service.create(dto); }
  @Roles('ADMIN', 'RECEPTIONIST') @Patch(':id/status') updateStatus(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.service.updateStatus(id, dto);
  }
}
