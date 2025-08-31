import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | null | undefined, format: 'short' | 'medium' | 'long' | 'full' = 'medium'): string {
    if (!value) return '';
    
    const date = new Date(value);
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    switch (format) {
      case 'short':
        options.month = 'numeric';
        options.day = 'numeric';
        options.year = '2-digit';
        break;
      case 'long':
        options.month = 'long';
        break;
      case 'full':
        options.weekday = 'long';
        options.month = 'long';
        break;
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}