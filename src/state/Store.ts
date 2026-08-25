import type { AppState } from '../types/AppState';
import type { Remittance } from '../types/Remittance';
import { DEFAULT_PAGE_SIZE } from '../utils/Constants';

export const remittanceMocks: readonly Remittance[] = [
  { id: '29003401', company: 'Western Union', amount: 12000, status: 'COBRADO', created_at: '20231001', charged_at: '20231006' },
  { id: '29003402', company: 'MoneyGram', amount: 8450, status: 'COBRADO', created_at: '20231001', charged_at: '20231006' },
  { id: '29003403', company: 'Remitly', amount: 13250, status: 'NO_COBRADO', created_at: '20231002', charged_at: null },
  { id: '29003404', company: 'Western Union', amount: 6800, status: 'COBRADO', created_at: '20231002', charged_at: '20231005' },
  { id: '29003405', company: 'Xoom', amount: 9250, status: 'NO_COBRADO', created_at: '20231002', charged_at: null },
  { id: '29003406', company: 'MoneyGram', amount: 15400, status: 'COBRADO', created_at: '20231003', charged_at: '20231005' },
  { id: '29003407', company: 'Wise', amount: 7100, status: 'COBRADO', created_at: '20231003', charged_at: '20231004' },
  { id: '29003408', company: 'Western Union', amount: 11000, status: 'NO_COBRADO', created_at: '20231003', charged_at: null },
  { id: '29003409', company: 'Remitly', amount: 9800, status: 'COBRADO', created_at: '20231004', charged_at: '20231004' },
  { id: '29003410', company: 'Xoom', amount: 6250, status: 'COBRADO', created_at: '20231004', charged_at: '20231004' },
  { id: '29003411', company: 'MoneyGram', amount: 18750, status: 'COBRADO', created_at: '20231004', charged_at: '20231003' },
  { id: '29003412', company: 'Wise', amount: 5200, status: 'NO_COBRADO', created_at: '20231005', charged_at: null },
  { id: '29003413', company: 'Western Union', amount: 14300, status: 'COBRADO', created_at: '20231005', charged_at: '20231003' },
  { id: '29003414', company: 'Remitly', amount: 7900, status: 'COBRADO', created_at: '20231005', charged_at: '20231002' },
  { id: '29003415', company: 'Xoom', amount: 11600, status: 'NO_COBRADO', created_at: '20231005', charged_at: null },
  { id: '29003416', company: 'MoneyGram', amount: 8900, status: 'COBRADO', created_at: '20231006', charged_at: '20231002' },
  { id: '29003417', company: 'Wise', amount: 10100, status: 'COBRADO', created_at: '20231006', charged_at: '20231001' },
  { id: '29003418', company: 'Western Union', amount: 7200, status: 'NO_COBRADO', created_at: '20231006', charged_at: null },
  { id: '29003419', company: 'Remitly', amount: 10500, status: 'COBRADO', created_at: '20231007', charged_at: '20231007' },
  { id: '29003420', company: 'Xoom', amount: 15600, status: 'COBRADO', created_at: '20231007', charged_at: '20231007' },
  { id: '29003421', company: 'MoneyGram', amount: 4300, status: 'NO_COBRADO', created_at: '20231007', charged_at: null },
  { id: '29003422', company: 'Wise', amount: 9700, status: 'COBRADO', created_at: '20231008', charged_at: '20231008' },
  { id: '29003423', company: 'Western Union', amount: 21000, status: 'COBRADO', created_at: '20231008', charged_at: '20231008' },
  { id: '29003424', company: 'Remitly', amount: 8600, status: 'NO_COBRADO', created_at: '20231008', charged_at: null },
  { id: '29003425', company: 'Xoom', amount: 11900, status: 'COBRADO', created_at: '20231009', charged_at: '20231009' },
  { id: '29003426', company: 'MoneyGram', amount: 6800, status: 'COBRADO', created_at: '20231009', charged_at: '20231009' },
  { id: '29003427', company: 'Wise', amount: 14500, status: 'COBRADO', created_at: '20231009', charged_at: '20231009' },
  { id: '29003428', company: 'Western Union', amount: 7500, status: 'NO_COBRADO', created_at: '20231010', charged_at: null },
  { id: '29003429', company: 'Remitly', amount: 12800, status: 'COBRADO', created_at: '20231010', charged_at: '20231010' },
  { id: '29003430', company: 'Xoom', amount: 9400, status: 'COBRADO', created_at: '20231010', charged_at: '20231010' },
  { id: '29003431', company: 'MoneyGram', amount: 17600, status: 'COBRADO', created_at: '20231011', charged_at: '20231011' },
  { id: '29003432', company: 'Wise', amount: 6100, status: 'NO_COBRADO', created_at: '20231011', charged_at: null },
  { id: '29003433', company: 'Western Union', amount: 15300, status: 'COBRADO', created_at: '20231011', charged_at: '20231011' },
  { id: '29003434', company: 'Remitly', amount: 8200, status: 'COBRADO', created_at: '20231012', charged_at: '20231012' },
  { id: '29003435', company: 'Xoom', amount: 10800, status: 'NO_COBRADO', created_at: '20231012', charged_at: null },
  { id: '29003436', company: 'MoneyGram', amount: 13700, status: 'COBRADO', created_at: '20231012', charged_at: '20231012' },
  { id: '29003437', company: 'Wise', amount: 5900, status: 'COBRADO', created_at: '20231013', charged_at: '20231013' },
  { id: '29003438', company: 'Western Union', amount: 16400, status: 'NO_COBRADO', created_at: '20231013', charged_at: null },
];

export const getMockRemittances = (): Remittance[] =>
  remittanceMocks.map((remittance) => ({ ...remittance }));

export const createInitialAppState = (): AppState => ({
  remittances: getMockRemittances(),
  searchQuery: '',
  isSearchOpen: false,
  isFilterOpen: false,
  isLoading: false,
  statusFilter: 'all',
  sortField: 'charged_at',
  sortDirection: 'desc',
  selectedSidebarItem: 'remittance',
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  paymentInput: '',
  alert: null,
});

export type StateUpdate = Partial<AppState> | ((state: AppState) => Partial<AppState>);
export type StoreListener = (state: AppState) => void;

export interface AppStore {
  getState: () => AppState;
  setState: (update: StateUpdate) => void;
  subscribe: (listener: StoreListener) => () => void;
}

export const createStore = (initialState = createInitialAppState()): AppStore => {
  let state = initialState;
  const listeners = new Set<StoreListener>();

  const notify = (): void => listeners.forEach((listener) => listener(state));

  return {
    getState: () => state,
    setState: (update) => {
      const patch = typeof update === 'function' ? update(state) : update;
      state = { ...state, ...patch };
      notify();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};
