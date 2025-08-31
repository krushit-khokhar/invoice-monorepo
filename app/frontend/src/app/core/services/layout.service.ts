import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private isSidebarOpen = new BehaviorSubject<boolean>(true);
  isSidebarOpen$ = this.isSidebarOpen.asObservable();

  toggleSidebar(): void {
    this.isSidebarOpen.next(!this.isSidebarOpen.value);
  }

  setSidebarState(isOpen: boolean): void {
    this.isSidebarOpen.next(isOpen);
  }
}