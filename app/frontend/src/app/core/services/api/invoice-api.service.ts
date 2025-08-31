import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateInvoice, Invoice, InvoiceListResponse, InvoiceSearchParams } from '../../../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  createInvoice(invoice: CreateInvoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/invoices`, invoice);
  }

  getInvoices(
    // page: number = 1,
    // limit: number = 10,
    // sort_by: string = 'invoice_date',
    order: 'ASC' | 'DESC' = 'DESC',
    // search?: string,
    // start_date?: Date,
    // end_date?: Date
  ): Observable<InvoiceListResponse> {
    let params = new HttpParams()
      // .set('page', page.toString())
      // .set('limit', limit.toString())
      // .set('sort_by', sort_by)
      .set('order', order);

    // if (search) params = params.set('search', search);
    // if (start_date) params = params.set('start_date', start_date.toISOString());
    // if (end_date) params = params.set('end_date', end_date.toISOString());

    return this.http.get<InvoiceListResponse>(`${this.apiUrl}/invoices`, { params });
  }

  /**
   * Advanced search with comprehensive filtering options
   * @param params InvoiceSearchParams object
   * @returns Observable with paginated search results
   */
  searchInvoices(params: InvoiceSearchParams): Observable<InvoiceListResponse> {
    let httpParams = new HttpParams();

    // Add all provided parameters to the request
    Object.keys(params).forEach(key => {
      const value = params[key as keyof InvoiceSearchParams];
      if (value !== undefined && value !== null && value !== '') {
        if (value instanceof Date) {
          httpParams = httpParams.set(key, value.toISOString());
        } else {
          httpParams = httpParams.set(key, value.toString());
        }
      }
    });

    return this.http.get<InvoiceListResponse>(`${this.apiUrl}/invoices/search`, { params: httpParams });
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/invoices/${id}`);
  }

  // updateInvoice(id: number, invoice: Partial<CreateInvoice>): Observable<Invoice> {
  //   return this.http.patch<Invoice>(`${this.apiUrl}/invoices/${id}`, invoice);
  // }

  // deleteInvoice(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/invoices/${id}`);
  // }
  advancedSearch(params: {
    search?: string;
    start_date?: Date;
    end_date?: Date;
    from_name?: string;
    to_name?: string;
    min_amount?: number;
    max_amount?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'ASC' | 'DESC';
  }): Observable<InvoiceListResponse> {
    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      const value = params[key as keyof typeof params];
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<InvoiceListResponse>(`${this.apiUrl}/invoices/search`, { params: httpParams });
  }
}