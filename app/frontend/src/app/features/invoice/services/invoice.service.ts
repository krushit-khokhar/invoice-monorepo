import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceApiService } from '../../../core/services/api/invoice-api.service';
import { CreateInvoice, DEFAULT_INVOICE_SEARCH_PARAMS, Invoice, InvoiceListResponse, InvoiceSearchParams } from '../../../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private invoiceApiService: InvoiceApiService) { }

  createInvoice(invoice: CreateInvoice): Observable<Invoice> {
    return this.invoiceApiService.createInvoice(invoice);
  }

  getInvoices(
    page: number = 1,
    limit: number = 10,
    sort_by: string = 'invoice_date',
    order: 'ASC' | 'DESC' = 'DESC',
    search?: string,
    start_date?: Date,
    end_date?: Date
  ): Observable<InvoiceListResponse> {
    // return this.invoiceApiService.getInvoices(page, limit, sort_by, order, search, start_date, end_date);
    return this.invoiceApiService.getInvoices(order);
  }
  searchInvoices(params: InvoiceSearchParams): Observable<InvoiceListResponse> {
    // Merge with default parameters
    const searchParams: InvoiceSearchParams = {
      ...DEFAULT_INVOICE_SEARCH_PARAMS,
      ...params
    };

    return this.invoiceApiService.advancedSearch(searchParams);
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.invoiceApiService.getInvoice(id);
  }

  // updateInvoice(id: number, invoice: Partial<CreateInvoice>): Observable<Invoice> {
  //   return this.invoiceApiService.updateInvoice(id, invoice);
  // }

  // deleteInvoice(id: number): Observable<void> {
  //   return this.invoiceApiService.deleteInvoice(id);
  // }

  hasActiveFilters(params: InvoiceSearchParams): boolean {
    return !!(
      params.search ||
      params.start_date ||
      params.end_date ||
      params.from_name ||
      params.to_name ||
      params.min_amount !== undefined ||
      params.max_amount !== undefined ||
      params.sort_by !== DEFAULT_INVOICE_SEARCH_PARAMS.sort_by ||
      params.order !== DEFAULT_INVOICE_SEARCH_PARAMS.order
    );
  }
  getFilterDescription(params: InvoiceSearchParams): string {
    const filters: string[] = [];

    if (params.search) {
      filters.push(`Search: "${params.search}"`);
    }

    if (params.start_date && params.end_date) {
      filters.push(`Date Range: ${params.start_date.toLocaleDateString()} - ${params.end_date.toLocaleDateString()}`);
    } else if (params.start_date) {
      filters.push(`From: ${params.start_date.toLocaleDateString()}`);
    } else if (params.end_date) {
      filters.push(`To: ${params.end_date.toLocaleDateString()}`);
    }

    if (params.from_name) {
      filters.push(`From: ${params.from_name}`);
    }

    if (params.to_name) {
      filters.push(`To: ${params.to_name}`);
    }
       if (params.min_amount !== undefined && params.max_amount !== undefined) {
      filters.push(`Amount: $${params.min_amount} - $${params.max_amount}`);
    } else if (params.min_amount !== undefined) {
      filters.push(`Min Amount: $${params.min_amount}`);
    } else if (params.max_amount !== undefined) {
      filters.push(`Max Amount: $${params.max_amount}`);
    }

    if (params.sort_by && params.sort_by !== DEFAULT_INVOICE_SEARCH_PARAMS.sort_by) {
      const sortField = params.sort_by.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      const sortOrder = params.order === 'ASC' ? 'Ascending' : 'Descending';
      filters.push(`Sorted by: ${sortField} (${sortOrder})`);
    }

    return filters.join(' • ') || 'No filters applied';
  }
}