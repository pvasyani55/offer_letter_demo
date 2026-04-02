import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<PaginationResult<Employee>> {
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.employeeRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create({
      ...employeeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.employeeRepository.save(employee);
  }

  async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
    await this.employeeRepository.update(id, {
      ...employeeData,
      updatedAt: new Date(),
    });
    return this.employeeRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  async search(query: string, page: number = 1, limit: number = 10): Promise<PaginationResult<Employee>> {
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.employeeRepository
      .createQueryBuilder('employee')
      .where('employee.name ILIKE :query OR employee.candidateName ILIKE :query OR employee.position ILIKE :query OR employee.jobRole ILIKE :query OR employee.candidateId ILIKE :query', {
        query: `%${query}%`,
      })
      .skip(skip)
      .take(limit)
      .orderBy('employee.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async seedDefaultEmployees(): Promise<void> {
    const defaultEmployees = [
      {
        name: 'Kevin White',
        candidateName: 'Kevin White',
        candidateAddress: '852 Security St, Chicago, USA',
        position: 'Security Engineer',
        jobRole: 'Cybersecurity Specialist',
        salary: 88000,
        basicSalary: 63000,
        basicMonthly: 5250,
        hra: 12600,
        hraMonthly: 1050,
        conveyance: 19200,
        conveyanceMonthly: 1600,
        medical: 5300,
        lta: 10600,
        otherBenefits: 2300,
        otherMonthly: 192,
        totalSalary: 88000,
        totalMonthly: 7333,
        joiningDate: '2023-09-01',
        offerExpiryDate: '2023-08-15',
        currentDate: '2023-08-01',
        year: '2023',
        candidateId: 'EMP006',
        companyName: 'Tech Corp',
        companyAddress: '456 Business Ave, New York, USA',
        companyInitials: 'TC',
        companyTagline: 'Innovating the Future',
        companyMission: 'To provide cutting-edge technology solutions.',
        hrName: 'Jane Smith',
        hrPosition: 'HR Manager',
        reportingManager: 'Karen Rodriguez',
        workLocation: 'Chicago',
        isActive: true,
      },
      {
        name: 'Michelle Garcia',
        candidateName: 'Michelle Garcia',
        candidateAddress: '963 AI Drive, Seattle, USA',
        position: 'AI Engineer',
        jobRole: 'Machine Learning Engineer',
        salary: 95000,
        basicSalary: 68000,
        basicMonthly: 5667,
        hra: 13600,
        hraMonthly: 1133,
        conveyance: 19200,
        conveyanceMonthly: 1600,
        medical: 6000,
        lta: 12000,
        otherBenefits: 2800,
        otherMonthly: 233,
        totalSalary: 95000,
        totalMonthly: 7917,
        joiningDate: '2023-10-10',
        offerExpiryDate: '2023-09-25',
        currentDate: '2023-09-01',
        year: '2023',
        candidateId: 'EMP007',
        companyName: 'Tech Corp',
        companyAddress: '456 Business Ave, New York, USA',
        companyInitials: 'TC',
        companyTagline: 'Innovating the Future',
        companyMission: 'To provide cutting-edge technology solutions.',
        hrName: 'John Doe',
        hrPosition: 'HR Director',
        reportingManager: 'Larry Kim',
        workLocation: 'Seattle',
        isActive: true,
      },
      {
        name: 'Brian Lee',
        candidateName: 'Brian Lee',
        candidateAddress: '159 Cloud Way, Austin, USA',
        position: 'Cloud Architect',
        jobRole: 'Cloud Solutions Architect',
        salary: 100000,
        basicSalary: 72000,
        basicMonthly: 6000,
        hra: 14400,
        hraMonthly: 1200,
        conveyance: 19200,
        conveyanceMonthly: 1600,
        medical: 6500,
        lta: 13000,
        otherBenefits: 3200,
        otherMonthly: 267,
        totalSalary: 100000,
        totalMonthly: 8333,
        joiningDate: '2023-11-01',
        offerExpiryDate: '2023-10-15',
        currentDate: '2023-10-01',
        year: '2023',
        candidateId: 'EMP008',
        companyName: 'Tech Corp',
        companyAddress: '456 Business Ave, New York, USA',
        companyInitials: 'TC',
        companyTagline: 'Innovating the Future',
        companyMission: 'To provide cutting-edge technology solutions.',
        hrName: 'Jane Smith',
        hrPosition: 'HR Manager',
        reportingManager: 'Nancy Patel',
        workLocation: 'Austin',
        isActive: true,
      },
      {
        name: 'Amanda Harris',
        candidateName: 'Amanda Harris',
        candidateAddress: '357 Analytics Blvd, Boston, USA',
        position: 'Business Analyst',
        jobRole: 'Data Business Analyst',
        salary: 76000,
        basicSalary: 55000,
        basicMonthly: 4583,
        hra: 11000,
        hraMonthly: 917,
        conveyance: 19200,
        conveyanceMonthly: 1600,
        medical: 4100,
        lta: 8200,
        otherBenefits: 1500,
        otherMonthly: 125,
        totalSalary: 76000,
        totalMonthly: 6333,
        joiningDate: '2023-12-05',
        offerExpiryDate: '2023-11-20',
        currentDate: '2023-11-01',
        year: '2023',
        candidateId: 'EMP009',
        companyName: 'Tech Corp',
        companyAddress: '456 Business Ave, New York, USA',
        companyInitials: 'TC',
        companyTagline: 'Innovating the Future',
        companyMission: 'To provide cutting-edge technology solutions.',
        hrName: 'John Doe',
        hrPosition: 'HR Director',
        reportingManager: 'Oscar Nguyen',
        workLocation: 'Boston',
        isActive: true,
      },
      {
        name: 'Daniel Clark',
        candidateName: 'Daniel Clark',
        candidateAddress: '468 Support St, San Francisco, USA',
        position: 'Technical Support',
        jobRole: 'Customer Support Engineer',
        salary: 65000,
        basicSalary: 47000,
        basicMonthly: 3917,
        hra: 9400,
        hraMonthly: 783,
        conveyance: 19200,
        conveyanceMonthly: 1600,
        medical: 3200,
        lta: 6400,
        otherBenefits: 1000,
        otherMonthly: 83,
        totalSalary: 65000,
        totalMonthly: 5417,
        joiningDate: '2024-01-15',
        offerExpiryDate: '2023-12-31',
        currentDate: '2023-12-01',
        year: '2024',
        candidateId: 'EMP010',
        companyName: 'Tech Corp',
        companyAddress: '456 Business Ave, New York, USA',
        companyInitials: 'TC',
        companyTagline: 'Innovating the Future',
        companyMission: 'To provide cutting-edge technology solutions.',
        hrName: 'Jane Smith',
        hrPosition: 'HR Manager',
        reportingManager: 'Paula Ramirez',
        workLocation: 'San Francisco',
        isActive: true,
      },
      {
        name: 'Rachel Lewis',
        candidateName: 'Rachel Lewis',
        candidateAddress: '579 Project Ave, New York, USA',
        position: 'Project Manager',
        jobRole: 'Agile Project Manager',
        salary: 85000,
        basicSalary: 61000,
        basicMonthly: 5083,
        hra: 12200,
        hraMonthly: 1017,
        conveyance: 19200,
        conveyanceMonthly: 1600,
        medical: 5100,
        lta: 10200,
        otherBenefits: 2100,
        otherMonthly: 175,
        totalSalary: 85000,
        totalMonthly: 7083,
        joiningDate: '2024-02-01',
        offerExpiryDate: '2024-01-15',
        currentDate: '2024-01-01',
        year: '2024',
        candidateId: 'EMP011',
        companyName: 'Tech Corp',
        companyAddress: '456 Business Ave, New York, USA',
        companyInitials: 'TC',
        companyTagline: 'Innovating the Future',
        companyMission: 'To provide cutting-edge technology solutions.',
        hrName: 'John Doe',
        hrPosition: 'HR Director',
        reportingManager: 'Quinn Stewart',
        workLocation: 'New York',
        isActive: true,
      },
      {
        name: 'Steven Walker',
        candidateName: 'Steven Walker',
        candidateAddress: '680 Design Blvd, Los Angeles, USA',
        position: 'Graphic Designer',
        jobRole: 'Visual Designer',
        salary: 70000,
        basicSalary: 50000,
        basicMonthly: 4167,
        hra: 10000,
        hraMonthly: 833,
        conveyance: 19200,
        conveyanceMonthly: 1600,
        medical: 3500,
        lta: 7000,
        otherBenefits: 1200,
        otherMonthly: 100,
        totalSalary: 70000,
        totalMonthly: 5833,
        joiningDate: '2024-03-10',
        offerExpiryDate: '2024-02-20',
        currentDate: '2024-02-01',
        year: '2024',
        candidateId: 'EMP012',
        companyName: 'Tech Corp',
        companyAddress: '456 Business Ave, New York, USA',
        companyInitials: 'TC',
        companyTagline: 'Innovating the Future',
        companyMission: 'To provide cutting-edge technology solutions.',
        hrName: 'Jane Smith',
        hrPosition: 'HR Manager',
        reportingManager: 'Rachel Turner',
        workLocation: 'Los Angeles',
        isActive: true,
      },
      {
        name: 'Olivia Hall',
        candidateName: 'Olivia Hall',
        candidateAddress: '791 Content St, Chicago, USA',
        position: 'Content Writer',
        jobRole: 'Technical Writer',
        salary: 65000,
        basicSalary: 47000,
        basicMonthly: 3917,
        hra: 9400,
        hraMonthly: 783,
        conveyance: 19200,
        conveyanceMonthly: 1600,
        medical: 3200,
        lta: 6400,
        otherBenefits: 1000,
        otherMonthly: 83,
        totalSalary: 65000,
        totalMonthly: 5417,
        joiningDate: '2024-04-05',
        offerExpiryDate: '2024-03-20',
        currentDate: '2024-03-01',
        year: '2024',
        candidateId: 'EMP013',
        companyName: 'Tech Corp',
        companyAddress: '456 Business Ave, New York, USA',
        companyInitials: 'TC',
        companyTagline: 'Innovating the Future',
        companyMission: 'To provide cutting-edge technology solutions.',
        hrName: 'John Doe',
        hrPosition: 'HR Director',
        reportingManager: 'Sam Underwood',
        workLocation: 'Chicago',
        isActive: true,
      },
    ];

    for (const employee of defaultEmployees) {
      await this.create(employee);
    }
  }
}
