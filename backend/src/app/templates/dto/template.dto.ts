import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  thumbnailBg?: string;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  previewHtml: string;

  @IsString()
  @IsOptional()
  css?: string;
}

export class SaveTemplateDto {
  @IsString()
  @IsNotEmpty()
  html: string;

  @IsString()
  @IsNotEmpty()
  css: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
