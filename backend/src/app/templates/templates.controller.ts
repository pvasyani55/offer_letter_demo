import { Controller, Get, Post, Body } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { Template } from './template.entity';
import { CreateTemplateDto, SaveTemplateDto } from './dto/template.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Post('save')
  async saveTemplate(@Body() templateData: SaveTemplateDto) {
    return this.templatesService.saveTemplate(templateData);
  }
}
