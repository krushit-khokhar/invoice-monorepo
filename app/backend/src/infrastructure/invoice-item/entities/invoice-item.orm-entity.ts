import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InvoiceOrmEntity } from 'src/infrastructure/invoice/entities/invoice.orm-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('invoice_items')
export class InvoiceItemOrmEntity {
  @ApiProperty({ 
    description: 'Invoice item ID (auto-generated)',
    example: 1 
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ 
    description: 'Name or description of the item',
    example: 'Web Development Services',
    maxLength: 255
  })
  @Column()
  item_name: string;

  @ApiProperty({ 
    description: 'Quantity of the item',
    example: 10 
  })
  @Column('int')
  qty: number;

  @ApiProperty({ 
    description: 'Unit price/rate of the item',
    example: 100.50 
  })
  @Column('decimal', { precision: 12, scale: 2 })
  rate: number;

  @ApiProperty({ 
    description: 'Total amount (quantity × rate)',
    example: 1005.00 
  })
  @Column('decimal', { precision: 12, scale: 2 })
  total: number;

  @ApiPropertyOptional({ 
    description: 'Associated invoice',
    type: () => InvoiceOrmEntity 
  })
  @ManyToOne(() => InvoiceOrmEntity, (invoice) => invoice.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id' })
  invoice: InvoiceOrmEntity;
}
