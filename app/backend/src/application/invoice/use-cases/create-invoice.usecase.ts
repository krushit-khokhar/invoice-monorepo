import { Invoice } from "src/core/invoice/entities/invoice.entity";
import { InvoiceRepository } from "src/core/invoice/repositories/invoice.repository";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { InvoiceItem } from "src/core/invoice-item/entities/invoice-item.entity";

export class CreateInvoiceUseCase {
  constructor(private readonly invoiceRepo: InvoiceRepository) {}

  async execute(dto: CreateInvoiceDto): Promise<Invoice> {
    const invoice_number =
      dto.invoice_number?.trim() || this.generateinvoice_number();
    const items = dto.items.map((i, idx) =>
      new InvoiceItem(0, i.item_name, i.qty, i.rate, 0, (i.qty*i.rate)),
    );

    const invoice = new Invoice(
      0,
      invoice_number,
      dto.from_name,
      dto.from_address,
      dto.to_name,
      dto.to_address,
      new Date(dto.invoice_date),
      items,
    );

    return this.invoiceRepo.create(invoice);
  }

  private generateinvoice_number(): string {
    const y = new Date().getFullYear();
    return `INV-${y}-${Date.now()}`;
  }
}
