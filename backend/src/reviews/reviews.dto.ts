import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsUUID() doctorId: string;
  @IsUUID() patientId: string;
  @IsOptional() @IsUUID() appointmentId?: string;
  @IsInt() @Min(1) @Max(5) rating: number;
  @IsString() comment: string;
}
