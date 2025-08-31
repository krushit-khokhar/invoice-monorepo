import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { CreateInvoice } from '../../../../shared/models/invoice.model';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {
  invoiceForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.createInvoiceForm();
  }

  ngOnInit(): void {
    this.addItem();
  }

  createInvoiceForm(): FormGroup {
    return this.fb.group({
      from_name: ['', [Validators.required, Validators.minLength(2)]],
      from_address: ['', [Validators.required, Validators.minLength(5)]],
      to_name: ['', [Validators.required, Validators.minLength(2)]],
      to_address: ['', [Validators.required, Validators.minLength(5)]],
      items: this.fb.array([], Validators.required),
      invoice_date: [new Date(), Validators.required],
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      item_name: ['', [Validators.required, Validators.minLength(2)]],
      qty: [1, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }]
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      this.calculateTotalAmount();
    }
  }

  calculateItemTotal(index: number): void {
    const itemGroup = this.items.at(index) as FormGroup;
    const qty = itemGroup.get('qty')?.value || 0;
    const rate = itemGroup.get('rate')?.value || 0;
    const total = qty * rate;
    
    itemGroup.patchValue({ total: total.toFixed(2) }, { emitEvent: false });
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): number {
   return this.items.controls.reduce((sum, control) => {
    const totalValue = control.get('total')?.value;
    const numericValue = Number(totalValue);
    return sum + (isNaN(numericValue) ? 0 : numericValue);
  }, 0);
  }
  formatDateForApi(date: Date): string {
  return date.toISOString(); // Converts to ISO 8601 format
 }
  onSubmit(): void {
    if (this.invoiceForm.valid) {
      this.isSubmitting = true;
      const formValue = this.invoiceForm.getRawValue();
      const invoiceData: CreateInvoice = {
        from_name: formValue.from_name,
        from_address: formValue.from_address,
        to_name: formValue.to_name,
        to_address: formValue.to_address,
        invoice_date: this.formatDateForApi(formValue.invoice_date),
        items: formValue.items.map((item: any) => ({
          item_name: item.item_name,
          qty: item.qty,
          rate: item.rate
        }))
      };

      this.invoiceService.createInvoice(invoiceData).subscribe({
        next: (invoice) => {
          this.isSubmitting = false;
          this.router.navigate(['/invoices']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error creating invoice:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.invoiceForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}