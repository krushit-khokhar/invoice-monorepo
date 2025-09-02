import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceCreateComponent } from './components/invoice-create/invoice-create.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { InvoiceSearchComponent } from './components/invoice-search/invoice-search.component';
import { SharedModule } from '../../shared/shared.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceService } from './services/invoice.service';

@NgModule({
  declarations: [   
    InvoiceCreateComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    InvoiceSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InvoiceRoutingModule,
  ],
  providers: [
    // Services
    InvoiceService
  ]
})
export class InvoiceModule { }