export const API_ENDPOINTS = {
  INVOICES: '/invoices',
  INVOICE_BY_ID: (id: number) => `/invoices/${id}`
};

export const ROUTES = {
  INVOICES: '/invoices',
  INVOICE_CREATE: '/invoices/create',
  INVOICE_DETAIL: (id: number) => `/invoices/${id}`
};

export const VALIDATION_PATTERNS = {
  NUMERIC: /^[0-9]*(\.[0-9]{0,2})?$/
};