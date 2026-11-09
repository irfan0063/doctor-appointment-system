import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards';
import { PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto } from './patients.dto';

@ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('patients')
export class PatientsController {
  constructor(private s: PatientsService) {}
  @Get() search(@Query('q') q?: string) { return this.s.search(q); }
  @Get(':id') findOne(@Param('id') id: string) { return this.s.findOne(id); }
  @Post() create(@Body() d: CreatePatientDto) { return this.s.create(d); }
  @Patch(':id') update(@Param('id') id: string, @Body() d: UpdatePatientDto) { return this.s.update(id, d); }
}
