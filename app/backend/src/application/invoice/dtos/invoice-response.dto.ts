import { ApiProperty } from '@nestjs/swagger';
import { InvoiceItemOrmEntity } from 'src/infrastructure/invoice-item/entities/invoice-item.orm-entity';

export class InvoiceResponseDto {
  @ApiProperty({ description: 'Invoice ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Unique invoice number', example: 'INV-2023-001' })
  invoice_number: string;

  @ApiProperty({ description: 'Name of the sender/company', example: 'Acme Corporation' })
  from_name: string;

  @ApiProperty({ description: 'Address of the sender/company', example: '123 Business St, City, Country' })
  from_address: string;

  @ApiProperty({ description: 'Name of the recipient/client', example: 'John Doe' })
  to_name: string;

  @ApiProperty({ description: 'Address of the recipient/client', example: '456 Client Ave, City, Country' })
  to_address: string;

  @ApiProperty({ description: 'Invoice date and time', example: '2023-12-01T00:00:00.000Z' })
  invoice_date: Date;

  @ApiProperty({ 
    description: 'Invoice items', 
    type: [InvoiceItemOrmEntity],
    example: [
      {
        id: 1,
        item_name: 'Web Development Services',
        qty: 10,
        rate: 100.50,
        total: 1005.00,
        invoice_id:1
      }
    ]
  })
  items: InvoiceItemOrmEntity[];

  @ApiProperty({ description: 'Creation timestamp', example: '2023-12-01T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2023-12-01T10:30:00.000Z' })
  updatedAt: Date;
}