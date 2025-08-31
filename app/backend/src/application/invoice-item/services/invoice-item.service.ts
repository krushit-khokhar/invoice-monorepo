import { CreateInvoiceItemUseCase } from '../use-cases/create-invoice-item.usecase';
import { GetItemsByInvoiceIdUseCase } from '../use-cases/get-items-by-invoice-id.usecase';
import { InvoiceItem } from '../../../core/invoice-item/entities/invoice-item.entity';
import { CreateInvoiceItemDto } from '../dtos/create-invoice-item.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceItemService {
  constructor(
    private readonly createItemUC: CreateInvoiceItemUseCase,
    private readonly getItemsUC: GetItemsByInvoiceIdUseCase,
  ) {}

  create(invoice_id: number, dto: CreateInvoiceItemDto): Promise<InvoiceItem> {
    if (!this.createItemUC) {
      throw new Error('CreateInvoiceItemUseCase is not injected');
    }
    return this.createItemUC.execute(invoice_id, dto);
  }

  getItemsByInvoiceId(invoice_id: number): Promise<InvoiceItem[]> {
    return this.getItemsUC.execute(invoice_id);
  }
}
