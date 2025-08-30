import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceOrmEntity } from 'src/infrastructure/invoice/entities/invoice.orm-entity';
import { DatabaseModule } from 'src/infrastructure/database.module';
import { InvoiceItemOrmEntity } from 'src/infrastructure/invoice-item/entities/invoice-item.orm-entity';
import { InvoiceController } from '../controllers/invoice.controller';
import { InvoiceRepositoryImpl } from 'src/infrastructure/invoice/repositories/invoice.repository.impl';
import { InvoiceItemRepositoryImpl } from 'src/infrastructure/invoice-item/repositories/invoice-item.repository.impl';
import { CreateInvoiceUseCase } from 'src/application/invoice/use-cases/create-invoice.usecase';
import { ListInvoicesUseCase } from 'src/application/invoice/use-cases/list-invoices.usecase';
import { GetInvoiceByIdUseCase } from 'src/application/invoice/use-cases/get-invoice-by-id.usecase';
import { SearchInvoicesUseCase } from 'src/application/invoice/use-cases/search-invoices.usecase';
import { InvoiceAppService } from 'src/application/invoice/services/invoice.service';

// application use-cases & services

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([InvoiceOrmEntity, InvoiceItemOrmEntity])],
  controllers: [InvoiceController],
  providers: [
    InvoiceRepositoryImpl,
    InvoiceItemRepositoryImpl,
    {
      provide: CreateInvoiceUseCase,
      useFactory: (repo: InvoiceRepositoryImpl) => new CreateInvoiceUseCase(repo),
      inject: [InvoiceRepositoryImpl],
    },
    {
      provide: ListInvoicesUseCase,
      useFactory: (repo: InvoiceRepositoryImpl) => new ListInvoicesUseCase(repo),
      inject: [InvoiceRepositoryImpl],
    },
    {
      provide: GetInvoiceByIdUseCase,
      useFactory: (repo: InvoiceRepositoryImpl) => new GetInvoiceByIdUseCase(repo),
      inject: [InvoiceRepositoryImpl],
    },
    {
      provide: SearchInvoicesUseCase,
      useFactory: (repo: InvoiceRepositoryImpl) => new SearchInvoicesUseCase(repo),
      inject: [InvoiceRepositoryImpl],
    },
    {
      provide: InvoiceAppService,
      useFactory: (
        createUC: CreateInvoiceUseCase,
        listUC: ListInvoicesUseCase,
        getByIdUC: GetInvoiceByIdUseCase,
        searchUC: SearchInvoicesUseCase,
      ) => new InvoiceAppService(createUC, listUC, getByIdUC, searchUC),
      inject: [CreateInvoiceUseCase, ListInvoicesUseCase, GetInvoiceByIdUseCase, SearchInvoicesUseCase],
    },
  ],
  exports: [InvoiceAppService],
})
export class InvoiceModule {}
