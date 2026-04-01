import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesService } from './templates.service';
import { Template } from './template.entity';
import { TemplatesController } from './templates.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template]),
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
