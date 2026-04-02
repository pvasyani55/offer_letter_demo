import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEmail, IsBoolean } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  candidateName: string;

  @IsString()
  @IsNotEmpty()
  candidateAddress: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  jobRole: string;

  @IsNumber()
  salary: number;

  @IsNumber()
  basicSalary: number;

  @IsNumber()
  basicMonthly: number;

  @IsNumber()
  hra: number;

  @IsNumber()
  hraMonthly: number;

  @IsNumber()
  conveyance: number;

  @IsNumber()
  conveyanceMonthly: number;

  @IsNumber()
  @IsOptional()
  medical?: number;

  @IsNumber()
  @IsOptional()
  lta?: number;

  @IsNumber()
  @IsOptional()
  otherBenefits?: number;

  @IsNumber()
  @IsOptional()
  otherMonthly?: number;

  @IsNumber()
  totalSalary: number;

  @IsNumber()
  totalMonthly: number;

  @IsString()
  joiningDate: string;

  @IsString()
  offerExpiryDate: string;

  @IsString()
  currentDate: string;

  @IsString()
  year: string;

  @IsString()
  candidateId: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  companyAddress: string;

  @IsString()
  @IsNotEmpty()
  companyInitials: string;

  @IsString()
  @IsNotEmpty()
  companyTagline: string;

  @IsString()
  @IsNotEmpty()
  companyMission: string;

  @IsString()
  @IsNotEmpty()
  hrName: string;

  @IsString()
  @IsNotEmpty()
  hrPosition: string;

  @IsString()
  @IsNotEmpty()
  reportingManager: string;

  @IsString()
  @IsNotEmpty()
  workLocation: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}
