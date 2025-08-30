import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get port(): number {
    return parseInt(process.env.NEST_APP_PORT || '5000', 10);
  }

  get database() {
    return {
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'dev_user',
      password: process.env.DB_PASSWORD || 'dev_password',
      database: process.env.DB_DATABASE || 'invoice_db',
    };
  }
}