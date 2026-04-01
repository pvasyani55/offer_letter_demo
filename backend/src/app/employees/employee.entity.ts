import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  candidateName: string;

  @Column({ type: 'text' })
  candidateAddress: string;

  @Column({ type: 'varchar', length: 255 })
  position: string;

  @Column({ type: 'varchar', length: 255 })
  jobRole: string;

  @Column({ type: 'varchar', length: 50 })
  salary: string;

  @Column({ type: 'varchar', length: 50 })
  basicSalary: string;

  @Column({ type: 'varchar', length: 50 })
  basicMonthly: string;

  @Column({ type: 'varchar', length: 50 })
  hra: string;

  @Column({ type: 'varchar', length: 50 })
  hraMonthly: string;

  @Column({ type: 'varchar', length: 50 })
  conveyance: string;

  @Column({ type: 'varchar', length: 50 })
  conveyanceMonthly: string;

  @Column({ type: 'varchar', length: 50 })
  medical: string;

  @Column({ type: 'varchar', length: 50 })
  lta: string;

  @Column({ type: 'varchar', length: 50 })
  otherBenefits: string;

  @Column({ type: 'varchar', length: 50 })
  otherMonthly: string;

  @Column({ type: 'varchar', length: 50 })
  totalSalary: string;

  @Column({ type: 'varchar', length: 50 })
  totalMonthly: string;

  @Column({ type: 'varchar', length: 100 })
  joiningDate: string;

  @Column({ type: 'varchar', length: 100 })
  offerExpiryDate: string;

  @Column({ type: 'varchar', length: 100 })
  currentDate: string;

  @Column({ type: 'varchar', length: 10 })
  year: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  candidateId: string;

  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({ type: 'text' })
  companyAddress: string;

  @Column({ type: 'varchar', length: 50 })
  companyInitials: string;

  @Column({ type: 'varchar', length: 255 })
  companyTagline: string;

  @Column({ type: 'text' })
  companyMission: string;

  @Column({ type: 'varchar', length: 255 })
  hrName: string;

  @Column({ type: 'varchar', length: 255 })
  hrPosition: string;

  @Column({ type: 'varchar', length: 255 })
  reportingManager: string;

  @Column({ type: 'varchar', length: 255 })
  workLocation: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
