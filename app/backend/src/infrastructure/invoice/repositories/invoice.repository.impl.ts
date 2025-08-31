import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceOrmEntity } from '../entities/invoice.orm-entity';
import { InvoiceItemOrmEntity } from 'src/infrastructure/invoice-item/entities/invoice-item.orm-entity';
import { InvoiceRepository as IInvoiceRepository } from 'src/core/invoice/repositories/invoice.repository';
import { Invoice as DomainInvoice } from 'src/core/invoice/entities/invoice.entity';
import { InvoiceItem as DomainInvoiceItem } from 'src/core/invoice-item/entities/invoice-item.entity';


@Injectable()
export class InvoiceRepositoryImpl implements IInvoiceRepository {
  constructor(
    @InjectRepository(InvoiceOrmEntity)
    private readonly repo: Repository<InvoiceOrmEntity>,
    @InjectRepository(InvoiceItemOrmEntity)
    private readonly itemRepo: Repository<InvoiceItemOrmEntity>,
  ) {}

  private toDomain(entity: InvoiceOrmEntity): DomainInvoice {
    const items = (entity.items || []).map(
      (it) => new DomainInvoiceItem(it.id, it.item_name, Number(it.qty), Number(it.rate), Number(it.total), 0),
    );
    return new DomainInvoice(
      entity.id,
      entity.invoice_number,
      entity.from_name,
      entity.from_address,
      entity.to_name,
      entity.to_address,
      new Date(entity.invoice_date),
      items,
    );
  }

  private toOrm(domain: DomainInvoice): InvoiceOrmEntity {
    const e = new InvoiceOrmEntity();
    if (domain.id) e.id = domain.id;
    e.invoice_number = domain.invoice_number;
    e.from_name = domain.from_name;
    e.from_address = domain.from_address;
    e.to_name = domain.to_name;
    e.to_address = domain.to_address;
    e.invoice_date = domain.invoice_date;
    e.items = domain.items.map((it) => {
      const oi = new InvoiceItemOrmEntity();
      if (it.id) oi.id = it.id;
      oi.item_name = it.item_name;
      oi.qty = it.qty;
      oi.rate = it.rate;
      oi.total = it.total;
      return oi;
    });
    return e;
  }

  async create(invoice: DomainInvoice): Promise<DomainInvoice> {
     try {
     const exists = await this.repo.findOne({ where: { invoice_number: invoice.invoice_number } });
    if (exists) {
      throw new ConflictException(`Invoice with number ${invoice.invoice_number} already exists`);
    }

    const orm = this.toOrm(invoice);
    const saved = await this.repo.save(orm);
    return this.toDomain(saved);
    } catch (error) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create invoice'); // catch DB or unknown errors
    }
  }

  async findAll(
    order: 'ASC' | 'DESC', 
    page = 1,
    limit = 10
  ): Promise<{data: DomainInvoice[]; total: number; page: number; limit: number, total_pages:number}> {
        try {
      const [results, total] = await this.repo.findAndCount({
      order: { invoice_date: order },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['items'],
    });
      if (!results || results.length === 0) {
        throw new NotFoundException('No invoices found');
      }
      return {
      data: results.map((r) => this.toDomain(r)),
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit)
    };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch invoices');
    }
  }

  async findById(id: number): Promise<DomainInvoice | null> {
   if (!id) throw new BadRequestException('Invoice ID is required');
   try {
     const inv = await this.repo.findOne({ where: { id }, relations: ['items'] });
      if (!inv) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }
      return this.toDomain(inv);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to fetch invoice by ID');
    }
  }

  async search(params: {
    invoice_number?: string;
    from_name?: string;
    to_name?: string;
    invoice_date?: Date;
  }): Promise<DomainInvoice[]> {
    try {
    const qb = this.repo.createQueryBuilder('invoice');

    if (params.invoice_number) {
      qb.andWhere('invoice.invoice_number LIKE :invoice_number', {
        invoice_number: `%${params.invoice_number}%`,
      });
    }
    if (params.from_name) {
      qb.andWhere('invoice.from_name LIKE :from_name', {
        from_name: `%${params.from_name}%`,
      });
    }
    if (params.to_name) {
      qb.andWhere('invoice.to_name LIKE :to_name', {
        to_name: `%${params.to_name}%`,
      });
    }
    if (params.invoice_date) {
      const dateStr = params.invoice_date.toISOString().split('T')[0];
      qb.andWhere('DATE(invoice.invoice_date) = :invoice_date', { invoice_date: dateStr });
    }

    const rows = await qb.getMany();
    return rows.map((r) => this.toDomain(r));
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to search invoices');
    }
  }
}
