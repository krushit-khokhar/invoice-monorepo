import { InvoiceItem } from '../entities/invoice-item.entity';

export abstract class InvoiceItemRepository {
  // Save a new invoice item.
  abstract create(item: InvoiceItem): Promise<InvoiceItem>;

  // Find items belonging to a given invoice.
  abstract findByInvoiceId(invoice_id: number): Promise<InvoiceItem[]>;
}
