import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { InvoiceSearchParams } from '../../../../shared/models/invoice.model';

@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.scss']
})
export class InvoiceSearchComponent implements OnInit, OnDestroy {
  @Output() searchChange = new EventEmitter<InvoiceSearchParams>();

  searchForm: FormGroup;
  lastSearchParams: InvoiceSearchParams | null = null;
  showAdvancedFilters = false;
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
      search: [''],
      start_date: [null],
      end_date: [null],
      from_name: [''],
      to_name: [''],
      min_amount: [null],
      max_amount: [null],
      sort_by: ['invoice_date'],  // ✅ FIXED: match InvoiceSearchParams
      order: ['DESC']
    });
  }

  private setupFormListeners(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => this.emitSearchParams());
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
      sort_by: formValue.sort_by,
      order: formValue.order,
      page: formValue.page,
      limit: formValue.limit
    };

    this.lastSearchParams = searchParams;
    this.searchChange.emit(searchParams);
  }

  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
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
      sort_by: 'invoice_date',
      order: 'DESC'
    });
    this.emitSearchParams(); // ✅ ensure list refreshes
  }

  onDateRangeClear(): void {
    this.searchForm.patchValue({ start_date: null, end_date: null });
    this.emitSearchParams();
  }

  onAmountRangeClear(): void {
    this.searchForm.patchValue({ min_amount: null, max_amount: null });
    this.emitSearchParams();
  }

  hasActiveFilters(): boolean {
    const f = this.searchForm.value;
    return !!(f.search || f.start_date || f.end_date || f.from_name || f.to_name || f.min_amount !== null || f.max_amount !== null);
  }

  getActiveFilterCount(): number {
    const f = this.searchForm.value;
    let count = 0;
    if (f.search) count++;
    if (f.start_date) count++;
    if (f.end_date) count++;
    if (f.from_name) count++;
    if (f.to_name) count++;
    if (f.min_amount !== null) count++;
    if (f.max_amount !== null) count++;
    return count;
  }
}
