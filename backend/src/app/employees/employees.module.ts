import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
