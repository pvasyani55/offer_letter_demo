import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesModule } from './app/templates/templates.module';
import { EmployeesModule } from './app/employees/employees.module';
import { OfferLettersModule } from './app/offer-letters/offer-letters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.SUPABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TemplatesModule,
    EmployeesModule,
    OfferLettersModule,
  ],
})
export class AppModule {}
