import { Routes } from '@angular/router';
import { invoiceGuard } from './guards/invoice.guard';
import { invoiceResolver } from './resolvers/invoice.resolver';

export const INVOICE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./components/invoice-list/invoice-list.component').then(m => m.InvoiceListComponent),
    data: {
      title: 'Invoice List - Invoice Management System',
      breadcrumb: 'Invoices List',
      animation: 'InvoiceListPage'
    }
  },
  {
    path: 'create',
    loadComponent: () => import('./components/invoice-create/invoice-create.component').then(m => m.InvoiceCreateComponent),
    data: {
      title: 'Create Invoice - Invoice Management System',
      breadcrumb: 'Create Invoice',
      animation: 'InvoiceCreatePage'
    },
    canActivate: [invoiceGuard]
  },
  {
    path: 'search',
    loadComponent: () => import('./components/invoice-search/invoice-search.component').then(m => m.InvoiceSearchComponent),
    data: {
      title: 'Search Invoices - Invoice Management System',
      breadcrumb: 'Search Invoices',
      animation: 'InvoiceSearchPage'
    }
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./components/invoice-detail/invoice-detail.component').then(m => m.InvoiceDetailComponent),
    data: {
      title: 'Invoice Details - Invoice Management System',
      breadcrumb: 'Invoice Details',
      animation: 'InvoiceDetailPage'
    },
    resolve: {
      invoice: invoiceResolver
    }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/invoice-create/invoice-create.component').then(m => m.InvoiceCreateComponent),
    data: {
      title: 'Edit Invoice - Invoice Management System',
      breadcrumb: 'Edit Invoice',
      animation: 'InvoiceEditPage',
      isEdit: true
    },
    canActivate: [invoiceGuard],
    resolve: {
      invoice: invoiceResolver
    }
  }
];