import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InvoiceOrmEntity } from './invoice/entities/invoice.orm-entity';
import { InvoiceItemOrmEntity } from './invoice-item/entities/invoice-item.orm-entity';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ only in dev!
      })
    }),
    TypeOrmModule.forFeature([InvoiceOrmEntity, InvoiceItemOrmEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
