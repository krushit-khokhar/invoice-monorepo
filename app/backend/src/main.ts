import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.FRONTEND_URL, process.env.API_URL], // frontend + swagger
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
   app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
    const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Invoice Management API',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: `
      .topbar { background-color: #4a5568; }
      .swagger-ui .info h1 { color: #4a5568; }
      .swagger-ui .btn.authorize { background-color: #4a5568; }
    `,
  });
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const port = configService.get<number>('port', 3000);
  logger.log(`🌐 URL: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
