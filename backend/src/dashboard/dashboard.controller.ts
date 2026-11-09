import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { DashboardService } from './dashboard.service';

@ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('dashboard')
export class DashboardController {
  constructor(private s: DashboardService) {}
  @Get() summary() { return this.s.summary(); }
}
