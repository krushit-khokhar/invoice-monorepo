import { InvoiceRepository } from 'src/core/invoice/repositories/invoice.repository';
import { SearchInvoicesDto } from '../dtos/search-invoices.dto';
import { Invoice } from 'src/core/invoice/entities/invoice.entity';

export class SearchInvoicesUseCase {
  constructor(private readonly invoices: InvoiceRepository) {}

  async execute(dto: SearchInvoicesDto): Promise<Invoice[]> {
    return this.invoices.search({
      invoice_number: dto.invoice_number?.trim() || undefined,
      from_name: dto.from_name?.trim() || undefined,
      to_name: dto.to_name?.trim() || undefined,
      invoice_date: dto.invoice_date ? new Date(dto.invoice_date) : undefined,
    });
  }
}
