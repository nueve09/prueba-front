import type { AlertManager } from '../../state/AlertManager';
import type { AppStore } from '../../state/Store';
import {
  selectFilteredRemittances,
  selectVisibleRemittances,
  type PaginatedRemittances,
} from '../../state/Selectors';
import { printRemittanceList } from '../../services/PrintService';
import type { RemittanceSortField, RemittanceStatusFilter } from '../../types/AppState';
import { LIST_LOADING_DELAY_MS } from '../../utils/Constants';

type ListSortField = Exclude<RemittanceSortField, 'charged_at'>;

export interface ListController {
  getVisibleRemittances: () => PaginatedRemittances;
  showSearch: () => void;
  search: (searchQuery: string) => void;
  restoreSearch: () => void;
  changePage: (currentPage: number) => void;
  toggleFilterDropdown: () => void;
  selectSortField: (sortField: ListSortField) => void;
  selectStatusFilter: (status: Exclude<RemittanceStatusFilter, 'all'>) => void;
  toggleSortDirection: () => void;
  printFilteredList: () => void;
  dispose: () => void;
}

export const createListController = (
  store: AppStore,
  alertManager: AlertManager,
): ListController => {
  let filterCloseTimer: ReturnType<typeof setTimeout> | undefined;
  let loadingTimer: ReturnType<typeof setTimeout> | undefined;

  const scheduleFilterClose = (): void => {
    if (filterCloseTimer) clearTimeout(filterCloseTimer);

    filterCloseTimer = setTimeout(() => {
      store.setState({ isFilterOpen: false });
      filterCloseTimer = undefined;
    }, 5000);
  };

  const runWithLoading = (action: () => void): void => {
    if (loadingTimer) clearTimeout(loadingTimer);
    store.setState({ isLoading: true });

    loadingTimer = setTimeout(() => {
      action();
      store.setState({ isLoading: false });
      loadingTimer = undefined;
    }, LIST_LOADING_DELAY_MS);
  };

  return {
    getVisibleRemittances: () => selectVisibleRemittances(store.getState()),
    showSearch: (): void => store.setState({ isSearchOpen: true }),
    search: (searchQuery): void => {
      runWithLoading(() => {
        const nextState = { ...store.getState(), searchQuery, currentPage: 1 };
        const hasResults = selectVisibleRemittances(nextState).totalItems > 0;

        store.setState({ searchQuery, currentPage: 1, isSearchOpen: false });
        alertManager.notifySearchResult(hasResults);
      });
    },
    restoreSearch: (): void => store.setState({ searchQuery: '', currentPage: 1 }),
    changePage: (currentPage): void => store.setState({ currentPage }),
    toggleFilterDropdown: (): void => {
      const isFilterOpen = store.getState().isFilterOpen;

      if (filterCloseTimer) clearTimeout(filterCloseTimer);
      filterCloseTimer = undefined;
      store.setState({ isFilterOpen: !isFilterOpen });

      if (!isFilterOpen) scheduleFilterClose();
    },
    selectSortField: (sortField): void => {
      runWithLoading(() => {
        store.setState({ sortField, sortDirection: 'desc', currentPage: 1 });
        scheduleFilterClose();
        alertManager.notifyFilterApplied();
      });
    },
    selectStatusFilter: (statusFilter): void => {
      runWithLoading(() => {
        store.setState({ statusFilter, currentPage: 1 });
        scheduleFilterClose();
        alertManager.notifyFilterApplied();
      });
    },
    toggleSortDirection: (): void => {
      runWithLoading(() => {
        const { sortDirection } = store.getState();
        store.setState({
          sortDirection: sortDirection === 'desc' ? 'asc' : 'desc',
          currentPage: 1,
        });
        scheduleFilterClose();
        alertManager.notifyFilterApplied();
      });
    },
    printFilteredList: (): void => {
      const remittances = selectFilteredRemittances(store.getState());

      if (remittances.length === 0) {
        alertManager.show('No se puede imprimir una lista vacia', 'error');
        return;
      }

      if (!printRemittanceList(remittances)) {
        alertManager.show('No se pudo abrir la ventana de impresión.', 'error');
      }
    },
    dispose: (): void => {
      if (filterCloseTimer) clearTimeout(filterCloseTimer);
      filterCloseTimer = undefined;
      if (loadingTimer) clearTimeout(loadingTimer);
      loadingTimer = undefined;
    },
  };
};
