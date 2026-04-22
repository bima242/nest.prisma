import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 tampilkan semua error global ke logs Railway
  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
  });
  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION:', err);
  });

  const config = new DocumentBuilder()
    .setTitle('Bimaa')
    .setDescription('Bimaa')
    .setVersion('2112')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('bimahebad', app, document);

  const port = process.env.PORT ?? 3000;
  console.log('🚀 Starting on port:', port);
  console.log('🔐 JWT_SECRET exists:', !!process.env.JWT_SECRET);
  console.log('🛢️ DATABASE_URL exists:', !!process.env.DATABASE_URL);

  await app.listen(port);
}

bootstrap();