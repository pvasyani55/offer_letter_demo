import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService, Employee, PaginationResult } from '../../services/employee.service';
import { TemplateService, Template } from '../../services/template.service';
import { TemplateSelectorModalComponent } from '../template-selector-modal/template-selector-modal.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, TemplateSelectorModalComponent],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  pagination: PaginationResult | null = null;
  currentPage = 1;
  pageSize = 10;
  searchQuery = '';
  isLoading = false;
  showAddModal = false;
  showEditModal = false;
  selectedEmployee: Employee | null = null;
  showTemplateModal = false;
  predefinedTemplates: Template[] = [];
  selectedTemplate: Template | null = null;

  newEmployee: Partial<Employee> = {
    name: '',
    candidateName: '',
    candidateAddress: '',
    position: '',
    jobRole: '',
    salary: 0,
    basicSalary: 0,
    basicMonthly: 0,
    hra: 0,
    hraMonthly: 0,
    conveyance: 0,
    conveyanceMonthly: 0,
    medical: 0,
    lta: 0,
    otherBenefits: 0,
    otherMonthly: 0,
    totalSalary: 0,
    totalMonthly: 0,
    joiningDate: '',
    offerExpiryDate: '',
    currentDate: '',
    year: '2026',
    candidateId: '',
    companyName: '',
    companyAddress: '',
    companyInitials: '',
    companyTagline: '',
    companyMission: '',
    hrName: '',
    hrPosition: '',
    reportingManager: '',
    workLocation: '',
    isActive: true
  };

  constructor(private employeeService: EmployeeService, private cd: ChangeDetectorRef, private router: Router, private templateService: TemplateService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadPredefinedTemplates();
  }

  loadEmployees(page: number = 1, search: string = ''): void {
    this.isLoading = true;
    this.currentPage = page;
    
    const serviceCall = search 
      ? this.employeeService.searchEmployees(search, page, this.pageSize)
      : this.employeeService.getEmployees(page, this.pageSize);
    
    serviceCall.subscribe({
      next: (result) => {
        this.isLoading = false;
        this.employees = result.data;
        this.pagination = result;
        console.log('employees loaded:', this.employees);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadEmployees(1, this.searchQuery);
  }

  onPageChange(page: any): void {
    this.loadEmployees(page, this.searchQuery);
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.newEmployee = {
      name: '',
      candidateName: '',
      candidateAddress: '',
      position: '',
      jobRole: '',
      salary: 0,
      basicSalary: 0,
      basicMonthly: 0,
      hra: 0,
      hraMonthly: 0,
      conveyance: 0,
      conveyanceMonthly: 0,
      medical: 0,
      lta: 0,
      otherBenefits: 0,
      otherMonthly: 0,
      totalSalary: 0,
      totalMonthly: 0,
      joiningDate: '',
      offerExpiryDate: '',
      currentDate: '',
      year: '2026',
      candidateId: '',
      companyName: '',
      companyAddress: '',
      companyInitials: '',
      companyTagline: '',
      companyMission: '',
      hrName: '',
      hrPosition: '',
      reportingManager: '',
      workLocation: '',
      isActive: true
    };
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  addEmployee(): void {
    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadEmployees(this.currentPage, this.searchQuery);
      },
      error: (error: any) => {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again.');
      }
    });
  }

  openEditModal(employee: Employee): void {
    this.selectedEmployee = { ...employee };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedEmployee = null;
  }

  updateEmployee(): void {
    if (!this.selectedEmployee) return;
    
    this.employeeService.updateEmployee(this.selectedEmployee.id, this.selectedEmployee).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadEmployees(this.currentPage, this.searchQuery);
      },
      error: (error: any) => {
        console.error('Error updating employee:', error);
        alert('Failed to update employee. Please try again.');
      }
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees(this.currentPage, this.searchQuery);
        },
        error: (error: any) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee. Please try again.');
        }
      });
    }
  }

  createOfferLetter(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showTemplateModal = true;
  }

  loadPredefinedTemplates(): void {
    this.templateService.getTemplates().subscribe({
      next: (templates) => {
        this.predefinedTemplates = templates;
        console.log('Templates loaded:', templates);
      },
      error: (error) => {
        console.error('Error loading templates:', error);
      }
    });
  }

  onTemplateSelected(template: Template): void {
    this.selectedTemplate = template;
  }

  onTemplateApplied(template: Template): void {
    if (!this.selectedEmployee) return;

    // Navigate to editor with both employeeId and templateId
    this.router.navigate(['/editor'], {
      queryParams: {
        employeeId: this.selectedEmployee.id,
        templateId: template.id
      }
    });

    this.closeTemplateModal();
  }

  closeTemplateModal(): void {
    this.showTemplateModal = false;
    this.selectedTemplate = null;
  }

  getFullName(employee: Employee): string {
    return employee.name;
  }

  getSalaryDisplay(salary: number): string {
    return salary ? salary.toLocaleString('en-IN') : '0';
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  get totalPages(): (number | string)[] {
    if (!this.pagination) return [];
    const pages = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) {
      if (i === 1 || i === this.pagination.totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  }
}
