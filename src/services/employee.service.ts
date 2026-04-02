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
  salary: number;
  basicSalary: number;
  basicMonthly: number;
  hra: number;
  hraMonthly: number;
  conveyance: number;
  conveyanceMonthly: number;
  medical?: number;
  lta?: number;
  otherBenefits?: number;
  otherMonthly?: number;
  totalSalary: number;
  totalMonthly: number;
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
}
