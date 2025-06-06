import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  // Enable CORS for your frontend
  app.enableCors();
  
  // Log the connection string (remove in production)
  console.log('Database URL:', process.env.CONNECTION_STRING ? 'Set' : 'Not set');
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
