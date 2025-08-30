import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './infrastructure/database.module';
import { InvoiceModule } from './presentation/invoice/modules/invoice.module';
import { InvoiceItemModule } from './presentation/invoice-item/modules/invoice-item.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    InvoiceModule,
    InvoiceItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
