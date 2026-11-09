import { IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { AppointmentStatus } from '../generated/prisma/client';

export class CreateAppointmentDto {
  @IsUUID() doctorId: string;
  @IsUUID() patientId: string;
  @IsDateString() appointmentDate: string;
  @IsOptional() @IsString() reason?: string;
  @IsOptional() @IsInt() @Min(0) feePkr?: number;
}
export class UpdateStatusDto { @IsEnum(AppointmentStatus) status: AppointmentStatus; }
