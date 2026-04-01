import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('offer_letters')
export class OfferLetter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @Column()
  employeeName: string;

  @Column('text')
  htmlContent: string;

  @Column('text')
  cssContent: string;

  @Column('text', { nullable: true })
  pdfContent: string; // Base64 encoded PDF

  @Column({ nullable: true })
  templateId: number;

  @Column({ default: 'draft' })
  status: 'draft' | 'generated' | 'sent' | 'accepted';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}