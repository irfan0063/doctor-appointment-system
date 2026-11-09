import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { CreateReviewDto } from './reviews.dto';
import { ReviewsService } from './reviews.service';

@ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Controller('reviews')
export class ReviewsController {
  constructor(private service: ReviewsService) {}
  @Get('doctor/:doctorId') byDoctor(@Param('doctorId') doctorId: string) { return this.service.byDoctor(doctorId); }
  @Roles('ADMIN', 'RECEPTIONIST') @Post() create(@Body() dto: CreateReviewDto) { return this.service.create(dto); }
}
