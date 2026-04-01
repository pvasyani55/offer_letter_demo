import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  candidateName: string;
  candidateAddress: string;
  position: string;
  jobRole: string;
  salary: string;
  basicSalary: string;
  basicMonthly: string;
  hra: string;
  hraMonthly: string;
  conveyance: string;
  conveyanceMonthly: string;
  medical: string;
  lta: string;
  otherBenefits: string;
  otherMonthly: string;
  totalSalary: string;
  totalMonthly: string;
  joiningDate: string;
  offerExpiryDate: string;
  currentDate: string;
  year: string;
  candidateId: string;
  companyName: string;
  companyAddress: string;
  companyInitials: string;
  companyTagline: string;
  companyMission: string;
  hrName: string;
  hrPosition: string;
  reportingManager: string;
  workLocation: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationResult {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apiService: ApiService) {}

  // Get all employees with pagination
  getEmployees(page: number = 1, limit: number = 10): Observable<PaginationResult> {
    return this.apiService.getWithParams<PaginationResult>('/employees', {
      page: page.toString(),
      limit: limit.toString()
    });
  }

  // Search employees
  searchEmployees(query: string, page: number = 1, limit: number = 10): Observable<PaginationResult> {
    return this.apiService.getWithParams<PaginationResult>('/employees/search', {
      q: query,
      page: page.toString(),
      limit: limit.toString()
    });
  }

  // Get single employee
  getEmployee(id: number): Observable<Employee> {
    return this.apiService.get<Employee>(`/employees/${id}`);
  }

  // Create employee
  createEmployee(employee: Partial<Employee>): Observable<Employee> {
    return this.apiService.post<Employee>('/employees', employee);
  }

  // Update employee
  updateEmployee(id: number, employee: Partial<Employee>): Observable<Employee> {
    return this.apiService.put<Employee>(`/employees/${id}`, employee);
  }

  // Delete employee
  deleteEmployee(id: number): Observable<void> {
    return this.apiService.delete<void>(`/employees/${id}`);
  }

  // Convert employee to candidate format for editor
  // employeeToCandidate(employee: Employee): any {
  //   return {
  //     id: employee.id,
  //     name: employee.name,
  //     candidateName: employee.candidateName,
  //     candidateAddress: employee.candidateAddress,
  //     position: employee.position,
  //     jobRole: employee.jobRole,
  //     salary: employee.salary,
  //     basicSalary: employee.basicSalary,
  //     basicMonthly: employee.basicMonthly,
  //     hra: employee.hra,
  //     hraMonthly: employee.hraMonthly,
  //     conveyance: employee.conveyance,
  //     conveyanceMonthly: employee.conveyanceMonthly,
  //     medical: employee.medical,
  //     lta: employee.lta,
  //     otherBenefits: employee.otherBenefits,
  //     otherMonthly: employee.otherMonthly,
  //     totalSalary: employee.totalSalary,
  //     totalMonthly: employee.totalMonthly,
  //     joiningDate: employee.joiningDate,
  //     offerExpiryDate: employee.offerExpiryDate,
  //     currentDate: employee.currentDate,
  //     year: employee.year,
  //     candidateId: employee.candidateId,
  //     companyName: employee.companyName,
  //     companyAddress: employee.companyAddress,
  //     companyInitials: employee.companyInitials,
  //     companyTagline: employee.companyTagline,
  //     companyMission: employee.companyMission,
  //     hrName: employee.hrName,
  //     hrPosition: employee.hrPosition,
  //     reportingManager: employee.reportingManager,
  //     workLocation: employee.workLocation,
  //     isActive: employee.isActive
  //   };
  // }
}
