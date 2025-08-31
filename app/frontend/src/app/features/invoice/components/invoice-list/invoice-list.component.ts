import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

// Shared Components
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { Invoice, InvoiceSearchParams } from '../../../../shared/models/invoice.model';
import { InvoiceService } from '../../services/invoice.service';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-invoice-list',
  imports: [
    CommonModule,
    DateFormatPipe,
    CurrencyFormatPipe,
    ReactiveFormsModule,
    RouterModule,
    
    // Material
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    
    // Shared
    LoadingSpinnerComponent
  ],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = ['invoice_number', 'invoice_date', 'from_name', 'to_name', 'total_amount', 'actions'];
  dataSource = new MatTableDataSource<Invoice>();
  isLoading = false;
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

 private currentSearchParams: InvoiceSearchParams = {
    page: 1,
    limit: this.pageSize,
    sort_by: 'invoice_date',
    order: 'DESC'
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

onSearchParamsChange(params: InvoiceSearchParams): void {
  this.currentSearchParams = {
    ...this.currentSearchParams,
    ...params,
    page: 1 // always reset to first page when filters change
  };
  this.currentPage = 0;
  this.loadInvoices();
}

  loadInvoices(): void {
    this.isLoading = true;
    
    this.invoiceService.getInvoices(
      this.currentPage + 1,
      this.pageSize,
      this.currentSearchParams.sort_by,
      this.currentSearchParams.order,
      this.currentSearchParams.search,
      this.currentSearchParams.start_date,
      this.currentSearchParams.end_date
    ).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalItems = response.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading invoices:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadInvoices();
  }

  onSortChange(event: Sort): void {
    this.currentSearchParams.sort_by = event.active;
    this.currentSearchParams.order = event.direction.toUpperCase() as 'ASC' | 'DESC';
    this.loadInvoices();
  }

  viewInvoice(invoice: Invoice): void {
    this.router.navigate(['/invoices/detail/', invoice.id]);
  }

  createInvoice(): void {
    this.router.navigate(['/invoices/create']);
  }

 hasActiveFilters(): boolean {
    const { search, start_date, end_date, from_name, to_name, min_amount, max_amount } = this.currentSearchParams;
    return !!(search || start_date || end_date || from_name || to_name || min_amount || max_amount);
  }
}