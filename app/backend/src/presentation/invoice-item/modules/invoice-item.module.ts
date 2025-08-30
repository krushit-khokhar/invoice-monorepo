import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItemOrmEntity } from '../../../infrastructure/invoice-item/entities/invoice-item.orm-entity';
import { InvoiceItemRepositoryImpl } from '../../../infrastructure/invoice-item/repositories/invoice-item.repository.impl';
import { InvoiceItemController } from '../controllers/invoice-item.controller';
import { InvoiceItemService } from '../../../application/invoice-item/services/invoice-item.service';
import { CreateInvoiceItemUseCase } from '../../../application/invoice-item/use-cases/create-invoice-item.usecase';
import { GetItemsByInvoiceIdUseCase } from '../../../application/invoice-item/use-cases/get-items-by-invoice-id.usecase';
import { InvoiceItemRepository } from '../../../core/invoice-item/repositories/invoice-item.repository';
import { InvoiceRepository } from 'src/core/invoice/repositories/invoice.repository';
import { InvoiceRepositoryImpl } from 'src/infrastructure/invoice/repositories/invoice.repository.impl';
import { InvoiceOrmEntity } from 'src/infrastructure/invoice/entities/invoice.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceItemOrmEntity, InvoiceOrmEntity])],
  controllers: [InvoiceItemController],
  providers: [
    InvoiceItemService,
    CreateInvoiceItemUseCase,
    GetItemsByInvoiceIdUseCase,
    {
      provide: InvoiceItemRepository,
      useClass: InvoiceItemRepositoryImpl,
    },
    { provide: InvoiceRepository, useClass: InvoiceRepositoryImpl },
  ],
  exports: [InvoiceItemService],
})
export class InvoiceItemModule {}
