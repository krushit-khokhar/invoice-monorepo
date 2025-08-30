import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InvoiceItemService } from '../../../application/invoice-item/services/invoice-item.service';
import { CreateInvoiceItemDto } from 'src/application/invoice-item/dtos/create-invoice-item.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceItemResponseDto } from 'src/application/invoice-item/dtos/invoice-item-response.dto';

@ApiTags('invoice-items')
@Controller('invoice-items')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}
  
  @Post(':invoice_id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new invoice item', 
    description: 'Adds a new item to an existing invoice. Calculates total automatically.' 
  })
  @ApiParam({ 
    name: 'invoice_id', 
    description: 'ID of the invoice to which the item belongs', 
    example: 1 
  })
  @ApiBody({ 
    type: CreateInvoiceItemDto,
    examples: {
      example1: {
        summary: 'Web development service',
        value: {
          item_name: 'Web Development Services',
          qty: 10,
          rate: 100.50
        }
      },
      example2: {
        summary: 'Consulting hours',
        value: {
          item_name: 'Consulting Hours',
          qty: 5,
          rate: 150.00
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Invoice item created successfully',
    type: InvoiceItemResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - validation failed' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Invoice not found' 
  })
  async create(
    @Param('invoice_id', ParseIntPipe) invoice_id: number,
    @Body() dto: CreateInvoiceItemDto
  ) {
    return this.invoiceItemService.create(invoice_id, dto);
  }

  @Get('invoice/:invoice_id')
  @ApiOperation({ 
    summary: 'Get items by invoice ID', 
    description: 'Retrieves all items associated with a specific invoice' 
  })
  @ApiParam({ 
    name: 'invoice_id', 
    description: 'ID of the invoice',
    example: 1 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Invoice items retrieved successfully',
    type: [InvoiceItemResponseDto]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Invoice not found or no items available' 
  })
  async getItemsByinvoice_id(@Param('invoice_id', ParseIntPipe) invoice_id: number) {
    return this.invoiceItemService.getItemsByInvoiceId(invoice_id);
  }
}
