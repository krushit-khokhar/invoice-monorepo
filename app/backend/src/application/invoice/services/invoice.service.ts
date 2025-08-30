import { CreateInvoiceUseCase } from '../use-cases/create-invoice.usecase';
import { GetInvoiceByIdUseCase } from '../use-cases/get-invoice-by-id.usecase';
import { ListInvoicesUseCase } from '../use-cases/list-invoices.usecase';
import { SearchInvoicesUseCase } from '../use-cases/search-invoices.usecase';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { ListInvoicesDto } from '../dtos/list-invoices.dto';
import { SearchInvoicesDto } from '../dtos/search-invoices.dto';
import { Invoice } from 'src/core/invoice/entities/invoice.entity';

export class InvoiceAppService {
  constructor(
    private readonly createInvoice: CreateInvoiceUseCase,
    private readonly listInvoices: ListInvoicesUseCase,
    private readonly getInvoiceById: GetInvoiceByIdUseCase,
    private readonly searchInvoices: SearchInvoicesUseCase,
  ) {}

  create(dto: CreateInvoiceDto): Promise<Invoice> {
    return this.createInvoice.execute(dto);
  }

  list(params: ListInvoicesDto) {
    return this.listInvoices.execute(params);
  }

  getById(id: number) {
    return this.getInvoiceById.execute(id);
  }

  search(dto: SearchInvoicesDto) {
    return this.searchInvoices.execute(dto);
  }
}
