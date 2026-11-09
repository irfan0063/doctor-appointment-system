import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { CreatePaymentDto, PaymentsService } from './payments.service';

@ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('payments')
export class PaymentsController {
  constructor(private s: PaymentsService) {}
  @Post() create(@Body() d: CreatePaymentDto) { return this.s.create(d); }
  @Get('appointment/:id') byAppointment(@Param('id') id: string) { return this.s.byAppointment(id); }
}
