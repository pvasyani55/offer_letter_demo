import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferLetter } from './offer-letter.entity';

@Injectable()
export class OfferLettersService {
  constructor(
    @InjectRepository(OfferLetter)
    private offerLettersRepository: Repository<OfferLetter>,
  ) {}

  findAll(): Promise<OfferLetter[]> {
    return this.offerLettersRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  findOne(id: number): Promise<OfferLetter> {
    return this.offerLettersRepository.findOneBy({ id });
  }

  findByEmployee(employeeId: number): Promise<OfferLetter[]> {
    return this.offerLettersRepository.find({
      where: { employeeId },
      order: { createdAt: 'DESC' }
    });
  }

  async create(offerLetterData: Partial<OfferLetter>): Promise<OfferLetter> {
    const offerLetter = this.offerLettersRepository.create(offerLetterData);
    return this.offerLettersRepository.save(offerLetter);
  }

  async update(id: number, offerLetterData: Partial<OfferLetter>): Promise<OfferLetter> {
    await this.offerLettersRepository.update(id, offerLetterData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.offerLettersRepository.delete(id);
  }
}