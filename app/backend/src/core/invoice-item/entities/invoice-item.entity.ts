export class InvoiceItem {
  constructor(
    public id: number,
    public item_name: string,
    public qty: number,
    public rate: number,
    public total:number,
    public invoice_id: number,
  ) {
    if (qty <= 0) throw new Error('Quantity must be > 0');
    if (rate < 0) throw new Error('Rate must be >= 0');
  }

  // Calculate line total
  get calculatedTotal(): number {
    return this.qty * this.rate;
  }
}