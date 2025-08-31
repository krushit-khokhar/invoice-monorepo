import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';

@NgModule({
  declarations: [DateFormatPipe, CurrencyFormatPipe],
  exports: [DateFormatPipe, CurrencyFormatPipe],
  imports: [
    CommonModule,
    MatProgressSpinnerModule, // optional: for other shared components
  ],
})

export class SharedModule {}
