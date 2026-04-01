import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { EmployeesService, PaginationResult } from './employees.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

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
  create(@Body() createEmployeeDto: Partial<Employee>) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Partial<Employee>) {
    return this.employeesService.update(parseInt(id, 10), updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(parseInt(id, 10));
  }
}
