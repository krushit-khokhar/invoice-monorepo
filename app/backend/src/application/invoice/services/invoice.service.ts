import { CreateInvoiceUseCase } from '../use-cases/create-invoice.usecase';
import { GetInvoiceByIdUseCase } from '../use-cases/get-invoice-by-id.usecase';
import { ListInvoicesUseCase } from '../use-cases/list-invoices.usecase';
import { SearchInvoicesUseCase } from '../use-cases/search-invoices.usecase';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { ListInvoicesDto } from '../dtos/list-invoices.dto';
import { SearchInvoicesDto } from '../dtos/search-invoices.dto';
import { Invoice } from 'src/core/invoice/entities/invoice.entity';
import { InvoiceResponseDto } from '../dtos/invoice-response.dto';

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

  async list(params: ListInvoicesDto) {
    const result = await this.listInvoices.execute(params);
    
    // Convert domain entities to response DTOs
    const data = result.data.map(invoice => new InvoiceResponseDto({
      ...invoice,
      total_amount: invoice.total_amount // Use the getter
    }));
    return {
      data,
      total: result.total,
      page: result.page,
      limit: result.limit,
      total_pages: result.total_pages
    };
  }

  async getById(id: number) {
     const result = await this.getInvoiceById.execute(id);
    const total_amount = result?.items?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;
    const data = new InvoiceResponseDto({
    ...result,
    total_amount: total_amount
  });
  return data;
  }

  search(dto: SearchInvoicesDto) {
    return this.searchInvoices.execute(dto);
  }
}
