import { Invoice } from '../entities/invoice.entity';

export abstract class InvoiceRepository {
  
  // Save a new invoice with items.
  abstract create(invoice: Invoice): Promise<Invoice>;

  //Find all invoices (with optional sorting by date).
  abstract findAll(
    order: 'ASC' | 'DESC',
    page?: number,
    limit?: number
  ): Promise<{data: Invoice[]; total: number; page: number; limit: number, total_pages:number }>;

  //Find one invoice by ID.
  abstract findById(id: number): Promise<Invoice | null>;

  //Search invoices by keyword (from_name, to_name, invoice_number/date etc.).
  abstract search(params: {
    invoice_number?: string;
    from_name?: string;
    to_name?: string;
    invoice_date?: Date;}): Promise<Invoice[]>;
}
