import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, Min, IsNumber } from 'class-validator';

export class CreateInvoiceItemDto {
  @ApiProperty({ 
    description: 'Name or description of the item',
    example: 'Web Development Services',
    maxLength: 255
  })
  @IsNotEmpty() @IsString()
  item_name: string;

  @ApiProperty({ 
    description: 'Quantity of the item',
    example: 10,
    minimum: 1
  })
  @IsNumber() @Min(1)
  qty: number;

  @ApiProperty({ 
    description: 'Unit price/rate of the item',
    example: 100.50,
    minimum: 0
  })
  @IsNumber() @Min(0)
  rate: number;
}