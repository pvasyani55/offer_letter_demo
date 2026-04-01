import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TemplatesService } from './app/templates/templates.service';


async function seed() {
  const app = await NestFactory.create(AppModule);
  const templatesService = app.get(TemplatesService);
  
  try {
    console.log('Seeding default templates...');
    await templatesService.seedDefaultTemplates();
    console.log('Templates seeded successfully!');
  } catch (error) {
    console.error('Error seeding templates:', error);
  } finally {
    await app.close();
  }
}

seed();
