import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferLettersService } from './offer-letters.service';
import { OfferLettersController } from './offer-letters.controller';
import { OfferLetter } from './offer-letter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfferLetter])],
  controllers: [OfferLettersController],
  providers: [OfferLettersService],
  exports: [OfferLettersService],
})
export class OfferLettersModule {}