import { InvoiceRepository } from 'src/core/invoice/repositories/invoice.repository';
import { ListInvoicesDto } from '../dtos/list-invoices.dto';
import { Invoice } from 'src/core/invoice/entities/invoice.entity';

export class ListInvoicesUseCase {
  constructor(private readonly invoices: InvoiceRepository) {}

  async execute(params: ListInvoicesDto): Promise<{ 
    data: Invoice[]; 
    total: number; 
    page: number; 
    limit: number;
    total_pages: number;
  }> {
    const order = params.order ?? 'DESC';
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    return this.invoices.findAll(order,page,limit);
  }
}
