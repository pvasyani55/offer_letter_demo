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

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0 })
  salary: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0 })
  basicSalary: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0 })
  basicMonthly: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0 })
  hra: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0  })
  hraMonthly: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0  })
  conveyance: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0  })
  conveyanceMonthly: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0  })
  medical: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  lta: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  otherBenefits: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0  })
  otherMonthly: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0  })
  totalSalary: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0  })
  totalMonthly: number;

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
