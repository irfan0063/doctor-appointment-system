import { PartialType } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { Gender } from '../generated/prisma/client';

export class CreatePatientDto {
  @IsString() fullName: string;
  @IsOptional() @IsString() fatherOrHusbandName?: string;
  @IsOptional() @Matches(/^\d{13}$/, { message: 'CNIC must be 13 digits without dashes' }) cnic?: string;
  @Matches(/^(\+92|0)3\d{9}$/, { message: 'Enter a valid Pakistani mobile number' }) phone: string;
  @IsOptional() @IsDateString() dateOfBirth?: string;
  @IsOptional() @IsEnum(Gender) gender?: Gender;
  @IsOptional() @IsString() bloodGroup?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() allergies?: string;
  @IsOptional() @IsString() chronicConditions?: string;
  @IsOptional() @IsString() emergencyContact?: string;
}
export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
