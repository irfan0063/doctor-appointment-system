import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { BookingStatus } from '../generated/prisma/client';

export class CreateBookingDto {
  @IsUUID() doctorId: string;
  @IsUUID() patientId: string;
  @IsOptional() @IsUUID() appointmentId?: string;
  @IsDateString() bookingDate: string;
  @IsOptional() @IsEnum(BookingStatus) status?: BookingStatus;
  @IsOptional() @IsString() notes?: string;
}

export class UpdateBookingDto {
  @IsEnum(BookingStatus) status: BookingStatus;
}
