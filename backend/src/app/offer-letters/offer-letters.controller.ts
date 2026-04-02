import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfferLettersService } from './offer-letters.service';
import { CreateOfferLetterDto, UpdateOfferLetterDto } from './dto/offer-letter.dto';

@Controller('offer-letters')
export class OfferLettersController {
  constructor(private readonly offerLettersService: OfferLettersService) {}

  @Post()
  create(@Body() createOfferLetterDto: CreateOfferLetterDto) {
    return this.offerLettersService.create(createOfferLetterDto);
  }

  @Get()
  findAll() {
    return this.offerLettersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerLettersService.findOne(+id);
  }

  @Get('employee/:employeeId')
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.offerLettersService.findByEmployee(+employeeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferLetterDto: UpdateOfferLetterDto) {
    return this.offerLettersService.update(+id, updateOfferLetterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerLettersService.remove(+id);
  }
}