import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Invoice } from '../../../shared/models/invoice.model';
import { InvoiceService } from '../services/invoice.service';

export const invoiceResolver: ResolveFn<Invoice> = (route, state) => {
  const router = inject(Router);
  const invoiceService = inject(InvoiceService);
  
  const id = route.paramMap.get('id');

  if (!id || isNaN(Number(id))) {
    router.navigate(['/invoices/list']);
    return EMPTY;
  }

  return invoiceService.getInvoice(Number(id)).pipe(
    catchError((error) => {
      router.navigate(['/invoices/list']);
      return EMPTY;
    })
  );
};