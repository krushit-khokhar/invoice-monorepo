import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Invoice Management API')
  .setDescription('Complete API for managing invoices, clients, and billing')
  .setVersion('1.0')
  .addTag('invoices', 'Everything about invoices')
  .addTag('clients', 'Client management operations')
  .addBearerAuth(
    { 
      type: 'http', 
      scheme: 'bearer', 
      bearerFormat: 'JWT' 
    },
    'access-token',
  )
  .build();