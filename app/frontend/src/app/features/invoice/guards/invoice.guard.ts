import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';

export const invoiceGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const invoiceService = inject(InvoiceService);

  // Check if we're editing an invoice
  if (route.routeConfig?.path === 'edit/:id') {
    const invoiceId = route.paramMap.get('id');
    
    if (!invoiceId || isNaN(Number(invoiceId))) {
      router.navigate(['/invoices/list']);
      return false;
    }
    
    // Additional validation can be added here
  }
  
  return true;
};