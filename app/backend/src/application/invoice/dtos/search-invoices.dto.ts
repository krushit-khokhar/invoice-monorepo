import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class SearchInvoicesDto {
  @ApiPropertyOptional({ 
    description: 'Invoice number to search for',
    example: 'INV-2023-001' 
  })
  @IsOptional() @IsString()
  invoice_number?: string;

  @ApiPropertyOptional({ 
    description: 'Sender name to search for',
    example: 'Acme Corporation' 
  })
  @IsOptional() @IsString()
  from_name?: string;

  @ApiPropertyOptional({ 
    description: 'Recipient name to search for',
    example: 'John Doe' 
  })
  @IsOptional() @IsString()
  to_name?: string;

  @ApiPropertyOptional({ 
    description: 'Invoice date to search for (YYYY-MM-DD)',
    example: '2023-12-01' 
  })
  @IsOptional() @IsDateString()
  invoice_date?: string;
}
