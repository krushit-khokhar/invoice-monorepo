import { ApiProperty } from '@nestjs/swagger';
import { InvoiceItemOrmEntity } from 'src/infrastructure/invoice-item/entities/invoice-item.orm-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
@Entity('invoices')
export class InvoiceOrmEntity {
  @ApiProperty({ description: 'Invoice ID (auto-generated)', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'INV-2023-001', description: 'Unique invoice number' })
  @Index({ unique: true })
  @Column()
  invoice_number: string;

  @ApiProperty({ description: 'Name of the sender/company', example: 'Acme Corporation' })
  @Column()
  from_name: string;

  @ApiProperty({ description: 'Address of the sender/company', example: '123 Business St, City, Country' })
  @Column()
  from_address: string;

  @ApiProperty({ description: 'Name of the recipient/client', example: 'John Doe' })
  @Column()
  to_name: string;

  @ApiProperty({ description: 'Address of the recipient/client', example: '456 Client Ave, City, Country' })
  @Column()
  to_address: string;

  @ApiProperty({ description: 'Invoice date and time', example: '2023-12-01T00:00:00.000Z' })
  @Column({ type: 'timestamp' })
  invoice_date: Date;

   @ApiProperty({ 
    description: 'Invoice items', 
    type: [InvoiceItemOrmEntity] 
  })
  @OneToMany(() => InvoiceItemOrmEntity, (item) => item.invoice, {
    cascade: true,
    eager: true, // load items automatically with invoice
  })
  items: InvoiceItemOrmEntity[];
}
