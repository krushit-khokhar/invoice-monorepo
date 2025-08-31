import { InvoiceItem } from '../../invoice-item/entities/invoice-item.entity';

export class Invoice {
  constructor(
    public id: number,
    public invoice_number: string,
    public from_name: string,
    public from_address: string,
    public to_name: string,
    public to_address: string,
    public invoice_date: Date,
    public items: InvoiceItem[] = [],
  ){
    if (!invoice_number) throw new Error('invoice_number is required');
    if (!from_name || !to_name) throw new Error('From/To names are required');
  }

  // Calculate the total amount of the invoice
  get total_amount(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  // Add an item to this invoice.
  addItem(item: InvoiceItem) {
    this.items.push(item);
  }
}
