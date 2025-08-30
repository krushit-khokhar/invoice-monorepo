import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateInvoiceItemDto } from '../../invoice-item/dtos/create-invoice-item.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateInvoiceDto {
  @ApiPropertyOptional({ 
    description: 'Unique invoice number (auto-generated if not provided)',
    example: 'INV-2023-001',
    required: false 
  })
  @IsOptional() @IsString()
  invoice_number?: string;

  @ApiProperty({ 
    description: 'Name of the sender/company',
    example: 'Acme Corporation' 
  })
  @IsNotEmpty() @IsString()
  from_name: string;

  @ApiProperty({ 
    description: 'Address of the sender/company',
    example: '123 Business St, City, Country' 
  })
  @IsNotEmpty() @IsString()
  from_address: string;

  @ApiProperty({ 
    description: 'Name of the recipient/client',
    example: 'John Doe' 
  })
  @IsNotEmpty() @IsString()
  to_name: string;

  @ApiProperty({ 
    description: 'Address of the recipient/client',
    example: '456 Client Ave, City, Country' 
  })
  @IsNotEmpty() @IsString()
  to_address: string;

  @ApiProperty({ 
    description: 'Invoice date in ISO format (YYYY-MM-DD)',
    example: '2023-12-01' 
  })
  @IsDateString()
  invoice_date: string;             // ISO string; will be converted to Date

  @ApiProperty({ 
    description: 'List of invoice items',
    type: [CreateInvoiceItemDto],
    example: [
      {
        item_name: 'Web Development Services',
        qty: 10,
        rate: 100.50
      }
    ]
  })
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];
}