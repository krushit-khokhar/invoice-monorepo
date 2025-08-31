
export class Helpers {
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }

  static calculateInvoiceTotal(items: any[]): number {
    return items.reduce((total, item) => {
      return total + (item.quantity * item.rate);
    }, 0);
  }

  static generateSearchQuery(params: any): string {
    const searchParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        searchParams.append(key, params[key].toString());
      }
    });
    
    return searchParams.toString();
  }
}