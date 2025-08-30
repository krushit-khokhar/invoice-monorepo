import { Injectable } from '@nestjs/common';
import { InvoiceItem } from '../../../core/invoice-item/entities/invoice-item.entity';
import { InvoiceItemRepository } from '../../../core/invoice-item/repositories/invoice-item.repository';

@Injectable()
export class GetItemsByInvoiceIdUseCase {
  constructor(private readonly invoiceItemRepo: InvoiceItemRepository) {}

  async execute(invoice_id: number): Promise<InvoiceItem[]> {
    return this.invoiceItemRepo.findByInvoiceId(invoice_id);
  }
}
