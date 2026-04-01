import { Routes } from '@angular/router';
import { Editor } from './editor/editor';
import { EmployeesComponent } from './employees/employees.component';

export const routes: Routes = [
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
    { path: 'editor', component: Editor },
    { path: 'employees', component: EmployeesComponent },
    { path: '**', redirectTo: '/employees' }
];
