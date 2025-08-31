import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { InvoiceSearchParams } from '../../../../shared/models/invoice.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-search',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss']
})
export class InvoiceSearchComponent implements OnInit, OnDestroy {
  @Output() searchChange = new EventEmitter<InvoiceSearchParams>();
  
  searchForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.createSearchForm();
  }

  ngOnInit(): void {
    this.setupFormListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createSearchForm(): FormGroup {
    return this.fb.group({
      // Search term
      search: [''],
      
      // Date range
      start_date: [null],
      end_date: [null],
      
      // Specific filters
      from_name: [''],
      to_name: [''],
      min_amount: [null],
      max_amount: [null],
      
      // Sorting
      sortBy: ['invoice_date'],
      order: ['DESC'],
      
      // Pagination
      page: [1],
      limit: [10]
    });
  }

  private setupFormListeners(): void {
    // Debounce text search to avoid too many API calls
    this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.emitSearchParams());

    // Immediate emit for other changes
    const immediateFields = [
      'start_date', 'end_date', 'from_name', 'to_name', 
      'min_amount', 'max_amount', 'sortBy', 'order'
    ];
    
    immediateFields.forEach(field => {
      this.searchForm.get(field)?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.emitSearchParams());
    });
  }

  private emitSearchParams(): void {
    const formValue = this.searchForm.value;
    const searchParams: InvoiceSearchParams = {
      search: formValue.search || undefined,
      start_date: formValue.start_date || undefined,
      end_date: formValue.end_date || undefined,
      from_name: formValue.from_name || undefined,
      to_name: formValue.to_name || undefined,
      min_amount: formValue.min_amount !== null ? Number(formValue.min_amount) : undefined,
      max_amount: formValue.max_amount !== null ? Number(formValue.max_amount) : undefined,
      sort_by: formValue.sortBy,
      order: formValue.order,
      page: formValue.page,
      limit: formValue.limit
    };

    this.searchChange.emit(searchParams);
  }

  onClearFilters(): void {
    this.searchForm.reset({
      search: '',
      start_date: null,
      end_date: null,
      from_name: '',
      to_name: '',
      min_amount: null,
      max_amount: null,
      sortBy: 'invoice_date',
      order: 'DESC',
      page: 1,
      limit: 10
    });
  }

  onDateRangeClear(): void {
    this.searchForm.patchValue({
      start_date: null,
      end_date: null
    });
  }

  onAmountRangeClear(): void {
    this.searchForm.patchValue({
      min_amount: null,
      max_amount: null
    });
  }

  hasActiveFilters(): boolean {
    const formValue = this.searchForm.value;
    return !!(
      formValue.search ||
      formValue.start_date ||
      formValue.end_date ||
      formValue.from_name ||
      formValue.to_name ||
      formValue.min_amount !== null ||
      formValue.max_amount !== null ||
      formValue.sortBy !== 'invoice_date' ||
      formValue.order !== 'DESC'
    );
  }
}