import { Invoice } from "src/core/invoice/entities/invoice.entity";
import { InvoiceRepository } from "src/core/invoice/repositories/invoice.repository";

export class GetInvoiceByIdUseCase {
  constructor(private readonly invoices: InvoiceRepository){}

  async execute(id: number): Promise<Invoice | null> {
    return this.invoices.findById(id);
  }
}