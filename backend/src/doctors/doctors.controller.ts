import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto, UpdateDoctorDto } from './doctors.dto';

@ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Controller('doctors')
export class DoctorsController {
  constructor(private s: DoctorsService) {}
  @Get() findAll(@Query('city') city?: string, @Query('specialty') sp?: string) { return this.s.findAll(city, sp); }
  @Get(':id') findOne(@Param('id') id: string) { return this.s.findOne(id); }
  @Roles('ADMIN') @Post() create(@Body() d: CreateDoctorDto) { return this.s.create(d); }
  @Roles('ADMIN') @Patch(':id') update(@Param('id') id: string, @Body() d: UpdateDoctorDto) { return this.s.update(id, d); }
  @Roles('ADMIN') @Delete(':id') remove(@Param('id') id: string) { return this.s.remove(id); }
}
