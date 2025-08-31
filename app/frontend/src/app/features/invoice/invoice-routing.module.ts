import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from './components/invoice-create/invoice-create.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { InvoiceSearchComponent } from './components/invoice-search/invoice-search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: InvoiceListComponent,
    data: {
      title: 'Invoice List - Invoice Management System',
      breadcrumb: 'Invoices List',
      animation: 'InvoiceListPage'
    }
  },
  {
    path: 'create',
    component: InvoiceCreateComponent,
    data: {
      title: 'Create Invoice - Invoice Management System',
      breadcrumb: 'Create Invoice',
      animation: 'InvoiceCreatePage'
    }
  },
  {
    path: 'search',
    component: InvoiceSearchComponent,
    data: {
      title: 'Search Invoices - Invoice Management System',
      breadcrumb: 'Search Invoices',
      animation: 'InvoiceSearchPage'
    }
  },
  {
    path: 'detail/:id',
    component: InvoiceDetailComponent,
    data: {
      title: 'Invoice Details - Invoice Management System',
      breadcrumb: 'Invoice Details',
      animation: 'InvoiceDetailPage'
    }
  },
  {
    path: 'edit/:id',
    component: InvoiceCreateComponent,
    data: {
      title: 'Edit Invoice - Invoice Management System',
      breadcrumb: 'Edit Invoice',
      animation: 'InvoiceEditPage',
      isEdit: true
    }
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }