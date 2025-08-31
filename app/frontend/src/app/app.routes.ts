import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full'
  },
  {
    path: 'invoices',
    loadChildren: () => import('./features/invoice/invoice.routes').then(m => m.INVOICE_ROUTES),
    data: {
      preload: true,
      animation: 'InvoiceModule'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Page Not Found - Invoice Management System',
      animation: 'NotFoundPage'
    }
  }
];