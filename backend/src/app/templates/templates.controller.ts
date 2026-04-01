import { Controller, Get, Post, Body } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { Template } from './template.entity';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @Post()
  create(@Body() createTemplateDto: any) {
    return this.templatesService.create(createTemplateDto);
  }

  @Post('save')
  async saveTemplate(@Body() templateData: { html: string; css: string; name: string }) {
    return this.templatesService.saveTemplate(templateData);
  }
}
