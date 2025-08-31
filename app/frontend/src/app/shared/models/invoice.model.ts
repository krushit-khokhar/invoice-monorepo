import { InvoiceItem } from "./invoice-item.model";

export interface Invoice {
  id?: number;
  invoice_number: string;
  invoice_date: Date;
  from_name: string;
  from_address: string;
  to_name: string;
  to_address: string;
  total_amount: number;
  items: InvoiceItem[];
}

export interface CreateInvoice {
  from_name: string;
  from_address: string;
  invoice_date:string;
  to_name: string;
  to_address: string;
  items: Omit<InvoiceItem, 'id' | 'total'>[];
}

export interface InvoiceListResponse {
  data: Invoice[];
  total: number;
  page: number;
  limit: number;
}


export interface InvoiceSearchParams {
  // Search parameters
  search?: string;
  start_date?: Date;
  end_date?: Date;
  from_name?: string;
  to_name?: string;
  min_amount?: number;
  max_amount?: number;
  // Pagination parameters
  page?: number;
  limit?: number;
  
  // Sorting parameters
  sort_by?: string;
  order?: 'ASC' | 'DESC';
}

export const DEFAULT_INVOICE_SEARCH_PARAMS: InvoiceSearchParams = {
  page: 1,
  limit: 10,
  sort_by: 'invoice_date',
  order: 'DESC'
};