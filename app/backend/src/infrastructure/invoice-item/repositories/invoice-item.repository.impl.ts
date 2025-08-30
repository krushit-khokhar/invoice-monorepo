import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceItemOrmEntity } from '../entities/invoice-item.orm-entity';
import { InvoiceItem as DomainInvoiceItem } from 'src/core/invoice-item/entities/invoice-item.entity';
import { InvoiceItemRepository as IInvoiceItemRepository } from 'src/core/invoice-item/repositories/invoice-item.repository';

@Injectable()
export class InvoiceItemRepositoryImpl implements IInvoiceItemRepository {
  constructor(
    @InjectRepository(InvoiceItemOrmEntity)
    private readonly repo: Repository<InvoiceItemOrmEntity>,
  ) {}

  private toDomain(e: InvoiceItemOrmEntity): DomainInvoiceItem {
    return new DomainInvoiceItem(e.id, e.item_name, Number(e.qty), Number(e.rate), Number(e.invoice.id));
  }

  async create(item: DomainInvoiceItem): Promise<DomainInvoiceItem> {
     try {
    const e = this.repo.create({
      item_name: item.item_name,
      qty: item.qty,
      rate: item.rate,
      total: item.qty * item.rate,
      invoice: { id: item.invoice_id } as any,
    });
    const saved = await this.repo.save(e);
    return this.toDomain(saved);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create invoice item');
    }
  }
  async findByInvoiceId(invoice_id: number): Promise<DomainInvoiceItem[]> {
    if (!invoice_id) throw new BadRequestException('Invoice ID is required');

    try {
    const invoiceWithItems = await this.repo.find({ where: { invoice: { id: invoice_id } } as any, relations: ['invoice']});
      if (!invoiceWithItems || invoiceWithItems.length === 0) {
    throw new NotFoundException(`Invoice with ID ${invoice_id} not found or has no items`);
  }
    return invoiceWithItems.map((r) => this.toDomain(r));
   } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to fetch invoice items');
    }
  }
}
