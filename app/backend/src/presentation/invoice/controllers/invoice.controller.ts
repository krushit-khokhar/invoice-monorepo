import { Body, Controller, Get, Param, Post, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateInvoiceDto } from 'src/application/invoice/dtos/create-invoice.dto';
import { InvoiceResponseDto } from 'src/application/invoice/dtos/invoice-response.dto';
import { ListInvoicesDto } from 'src/application/invoice/dtos/list-invoices.dto';
import { SearchInvoicesDto } from 'src/application/invoice/dtos/search-invoices.dto';
import { InvoiceAppService } from 'src/application/invoice/services/invoice.service';

@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly service: InvoiceAppService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new invoice', 
    description: 'Creates a new invoice with items. Invoice number will be auto-generated if not provided.' 
  })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Invoice created successfully',
    type: InvoiceResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - validation failed' 
  })
  async create(@Body() dto: CreateInvoiceDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'List all invoices', 
    description: 'Retrieves a list of all invoices with optional sorting' 
  })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'], example: 'DESC' })
  @ApiResponse({ 
    status: 200, 
    description: 'Invoices retrieved successfully',
    type: [InvoiceResponseDto]
  })
  async list(@Query() query: ListInvoicesDto) {
    return this.service.list(query);
  }

  @Get('search')
    @ApiOperation({ 
    summary: 'Search invoices', 
    description: 'Search invoices by various criteria including invoice number, sender, recipient, or date' 
  })
  @ApiQuery({ name: 'invoice_number', required: false, type: String, example: 'INV-2023-001' })
  @ApiQuery({ name: 'from_name', required: false, type: String, example: 'Acme Corporation' })
  @ApiQuery({ name: 'to_name', required: false, type: String, example: 'John Doe' })
  @ApiQuery({ name: 'invoice_date', required: false, type: String, example: '2023-12-01' })
  @ApiResponse({ 
    status: 200, 
    description: 'Search results retrieved successfully',
    type: [InvoiceResponseDto]
  })
  async search(@Query() query: SearchInvoicesDto) {
    return this.service.search(query);
  }

  @Get(':id')
   @ApiOperation({ 
    summary: 'Get invoice by ID', 
    description: 'Retrieves a specific invoice with all its items by ID' 
  })
  @ApiParam({ name: 'id', description: 'Invoice ID', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Invoice retrieved successfully',
    type: InvoiceResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Invoice not found' 
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getById(id);
  }
}
