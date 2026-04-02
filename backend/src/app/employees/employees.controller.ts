import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { EmployeesService, PaginationResult } from './employees.service';
import { Employee } from './employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { getMetadataArgsStorage } from 'typeorm';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('fields')
  getEntityFields() {
    const columns = getMetadataArgsStorage().columns.filter(
      col => col.target === Employee
    );

    return columns.map(col => ({
        key: col.propertyName,
        label: col.propertyName,
        category: 'Fields',
      }));
  }

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.employeesService.findAll(pageNum, limitNum);
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.employeesService.search(query, pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(parseInt(id, 10));
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(parseInt(id, 10), updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(parseInt(id, 10));
  }
}
