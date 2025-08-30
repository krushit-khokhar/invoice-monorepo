import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvoiceItemResponseDto {
  @ApiProperty({ 
    description: 'Invoice item ID',
    example: 1 
  })
  id: number;

  @ApiProperty({ 
    description: 'Name or description of the item',
    example: 'Web Development Services'
  })
  item_name: string;

  @ApiProperty({ 
    description: 'Quantity of the item',
    example: 10 
  })
  qty: number;

  @ApiProperty({ 
    description: 'Unit price/rate of the item',
    example: 100.50 
  })
  rate: number;

  @ApiProperty({ 
    description: 'Total amount (quantity × rate)',
    example: 1005.00 
  })
  total: number;

  @ApiPropertyOptional({ 
    description: 'Associated invoice ID',
    example: 1 
  })
  invoice_id?: number;
}