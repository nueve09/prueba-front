import type { Remittance } from './Remittance';

export type AlertType = 'success' | 'error' | 'info';
export type RemittanceSortField = 'charged_at' | 'id' | 'company' | 'amount';
export type SortDirection = 'asc' | 'desc';
export type RemittanceStatusFilter = 'all' | 'COBRADO' | 'NO_COBRADO';

export interface AppAlert {
  message: string;
  type: AlertType;
}

export interface AppState {
  remittances: Remittance[];
  searchQuery: string;
  isSearchOpen: boolean;
  isFilterOpen: boolean;
  isLoading: boolean;
  statusFilter: RemittanceStatusFilter;
  sortField: RemittanceSortField;
  sortDirection: SortDirection;
  selectedSidebarItem: string;
  currentPage: number;
  pageSize: number;
  paymentInput: string;
  alert: AppAlert | null;
}
