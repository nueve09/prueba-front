import type { AppState, RemittanceSortField, RemittanceStatusFilter, SortDirection } from '../types/AppState';
import type { Remittance } from '../types/Remittance';

export interface PaginatedRemittances {
  items: Remittance[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

const normalize = (value: string): string => value.trim().toLocaleLowerCase('es-MX');

const getAmountSearchValues = (amount: number): string[] => [
  String(amount),
  amount.toLocaleString('en-US'),
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }),
];

export const selectSearchedRemittances = (
  remittances: Remittance[],
  searchQuery: string,
): Remittance[] => {
  const query = normalize(searchQuery);

  if (!query) return [...remittances];

  return remittances.filter((remittance) => {
    const searchableValues = [
      remittance.id,
      remittance.company,
      ...getAmountSearchValues(remittance.amount),
    ].map(normalize);

    return searchableValues.some((value) => value.includes(query));
  });
};

export const selectChargedRemittances = (remittances: Remittance[]): Remittance[] =>
  remittances.filter((remittance) => remittance.status === 'COBRADO');

export const selectRemittancesByStatus = (
  remittances: Remittance[],
  statusFilter: Exclude<RemittanceStatusFilter, 'all'>,
): Remittance[] => remittances.filter((remittance) => remittance.status === statusFilter);

export const selectRemittancesByChargedDate = (remittances: Remittance[]): Remittance[] =>
  [...remittances].sort((first, second) =>
    (second.charged_at ?? '').localeCompare(first.charged_at ?? ''),
  );

export const selectRemittancesByField = (
  remittances: Remittance[],
  field: RemittanceSortField,
  direction: SortDirection,
): Remittance[] => {
  if (field === 'charged_at') {
    const orderedByDate = selectRemittancesByChargedDate(remittances);
    return direction === 'desc' ? orderedByDate : orderedByDate.reverse();
  }

  const multiplier = direction === 'asc' ? 1 : -1;
  return [...remittances].sort((first, second) => {
    if (field === 'amount') return (first.amount - second.amount) * multiplier;

    return first[field].localeCompare(second[field], 'es-MX', { numeric: true }) * multiplier;
  });
};

export const selectPaginatedRemittances = (
  remittances: Remittance[],
  requestedPage: number,
  pageSize: number,
): PaginatedRemittances => {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const totalItems = remittances.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(requestedPage)), totalPages);
  const startIndex = (currentPage - 1) * safePageSize;

  return {
    items: remittances.slice(startIndex, startIndex + safePageSize),
    currentPage,
    totalItems,
    totalPages,
  };
};

export const selectFilteredRemittances = ({
  remittances,
  searchQuery,
  sortField,
  sortDirection,
  statusFilter,
}: Pick<
  AppState,
  'remittances' | 'searchQuery' | 'sortField' | 'sortDirection' | 'statusFilter'
>): Remittance[] => {
  const searched = selectSearchedRemittances(remittances, searchQuery);
  const results =
    statusFilter === 'all'
      ? searchQuery.trim()
        ? searched
        : selectChargedRemittances(searched)
      : selectRemittancesByStatus(searched, statusFilter);
  return selectRemittancesByField(results, sortField, sortDirection);
};

export const selectVisibleRemittances = ({
  currentPage,
  pageSize,
  ...state
}: AppState): PaginatedRemittances => {
  return selectPaginatedRemittances(selectFilteredRemittances(state), currentPage, pageSize);
};
