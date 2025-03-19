import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from React frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Add correct frontend port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  

  // Use global validation pipes for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000); // Change from 3000 to 4000
  ;
  console.log('Server running on http://localhost:4000');

}
bootstrap();
