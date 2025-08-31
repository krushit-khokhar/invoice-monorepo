// dtos/invoice-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { InvoiceItemResponseDto } from 'src/application/invoice-item/dtos/invoice-item-response.dto';

export class InvoiceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  invoice_number: string;

  @ApiProperty()
  from_name: string;

  @ApiProperty()
  from_address: string;

  @ApiProperty()
  to_name: string;

  @ApiProperty()
  to_address: string;

  @ApiProperty()
  invoice_date: Date;

  @ApiProperty({ type: [InvoiceItemResponseDto] })
  items: InvoiceItemResponseDto[];

  @ApiProperty()
  total_amount: number;

  constructor(invoice: any) {
    this.id = invoice.id;
    this.invoice_number = invoice.invoice_number;
    this.from_name = invoice.from_name;
    this.from_address = invoice.from_address;
    this.to_name = invoice.to_name;
    this.to_address = invoice.to_address;
    this.invoice_date = invoice.invoice_date;
    this.items = invoice.items || [];
    this.total_amount = this.calculateTotalAmount(invoice);
  }

  private calculateTotalAmount(invoice: any): number {
    if (invoice.items && Array.isArray(invoice.items)) {
      return invoice.items.reduce((sum: number, item: any) => {
        return sum + (item.total || 0);
      }, 0);
    }
    return 0;
  }
}