import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';

export enum OfferLetterStatus {
  DRAFT = 'draft',
  GENERATED = 'generated',
  SENT = 'sent',
  ACCEPTED = 'accepted',
}

export class CreateOfferLetterDto {
  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @IsString()
  @IsNotEmpty()
  htmlContent: string;

  @IsString()
  @IsNotEmpty()
  cssContent: string;

  @IsString()
  @IsOptional()
  pdfContent?: string;

  @IsNumber()
  @IsOptional()
  templateId?: number;

  @IsEnum(OfferLetterStatus)
  @IsOptional()
  status?: OfferLetterStatus;
}

export class UpdateOfferLetterDto {
  @IsString()
  @IsOptional()
  htmlContent?: string;

  @IsString()
  @IsOptional()
  cssContent?: string;

  @IsString()
  @IsOptional()
  pdfContent?: string;

  @IsEnum(OfferLetterStatus)
  @IsOptional()
  status?: OfferLetterStatus;
}
