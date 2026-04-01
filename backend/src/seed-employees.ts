import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmployeesService } from './app/employees/employees.service';

async function seedEmployees() {
  const app = await NestFactory.create(AppModule);
  const employeesService = app.get(EmployeesService);
  
  try {
    console.log('Seeding default employees...');
    await employeesService.seedDefaultEmployees();
    console.log('Employees seeded successfully!');
  } catch (error) {
    console.error('Error seeding employees:', error);
  } finally {
    await app.close();
  }
}

seedEmployees();
