import { InvoiceRepository } from 'src/core/invoice/repositories/invoice.repository';
import { ListInvoicesDto } from '../dtos/list-invoices.dto';
import { Invoice } from 'src/core/invoice/entities/invoice.entity';

export class ListInvoicesUseCase {
  constructor(private readonly invoices: InvoiceRepository) {}

  async execute(params: ListInvoicesDto): Promise<Invoice[]> {
    const order = params.order ?? 'DESC';
    return this.invoices.findAll(order);
  }
}
