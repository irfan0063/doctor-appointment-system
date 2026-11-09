import { PartialType } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

export class CreateDoctorDto {
  @IsString() fullName: string;
  @IsString() pmdcNumber: string;
  @IsString() specialty: string;
  @IsOptional() @IsString() qualification?: string;
  @Matches(/^(\+92|0)3\d{9}$/, { message: 'Enter a valid Pakistani mobile number' }) phone: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() clinicName?: string;
  @IsOptional() @IsInt() @Min(0) consultationFeePkr?: number;
  @IsOptional() @IsArray() @IsString({ each: true }) availableDays?: string[];
}
export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
