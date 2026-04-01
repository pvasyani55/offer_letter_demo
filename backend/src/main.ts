import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the Angular frontend
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:4202'], // Angular dev server
    credentials: true,
  });
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend server running on http://localhost:${port}`);
}

bootstrap();
