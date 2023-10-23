import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log('Bootstrap start');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  console.log('localhost:' + process.env.PORT);

  const config = new DocumentBuilder()
    .setTitle('Mall')
    .setDescription('The mall API description')
    .setVersion('1.0')
    .addTag('chain-app')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}

bootstrap();
