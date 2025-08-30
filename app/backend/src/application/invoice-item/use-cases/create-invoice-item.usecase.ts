import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceItem } from '../../../core/invoice-item/entities/invoice-item.entity';
import { InvoiceItemRepository } from '../../../core/invoice-item/repositories/invoice-item.repository';
import { CreateInvoiceItemDto } from '../dtos/create-invoice-item.dto';
import { InvoiceRepository } from 'src/core/invoice/repositories/invoice.repository';

@Injectable()
export class CreateInvoiceItemUseCase {
  constructor(
    private readonly invoiceItemRepo: InvoiceItemRepository,
    private readonly invoiceRepo: InvoiceRepository,
  ) {}

  async execute(invoice_id: number, dto: CreateInvoiceItemDto): Promise<InvoiceItem> {
     const invoice = await this.invoiceRepo.findById(invoice_id);
  if (!invoice) {
    throw new NotFoundException(`Invoice with id ${invoice_id} not found`);
  }
    const item = new InvoiceItem(0, dto.item_name, dto.qty, dto.rate, invoice_id);
    return this.invoiceItemRepo.create(item);
  }
}
