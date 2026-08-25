import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';
import { createAlert } from './components/Alert';
import { createActivityLoader } from './components/ActivityLoader';
import { createAppShell } from './components/AppShell';
import { createFilterDropdown } from './components/FilterDropdown';
import { createRemittanceList } from './components/RemittanceList';
import { createSearchBar } from './components/SearchBar';
import { createSearchLabel } from './components/SearchLabel';
import { createSidebar } from './components/Sidebar';
import { createTopbar } from './components/Topbar';
import userElizabethAvatar from '../assets/images/user-elizabeth.jpg';
import { createListController } from './features/remittance-list/ListController';
import { createPagination } from './features/remittance-list/Pagination';
import { createPaymentController } from './features/remittance-payment/PaymentController';
import { createPaymentForm } from './features/remittance-payment/PaymentForm';
import { sidebarMenuItems } from './components/SidebarMenu';
import { createAlertManager } from './state/AlertManager';
import { createStore } from './state/Store';

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('No se encontró el contenedor principal de la aplicación.');
}

const store = createStore();
const alertManager = createAlertManager(store);
const paymentController = createPaymentController(store, alertManager);
const listController = createListController(store, alertManager);
let isPaymentPanelOpen = true;

const getTodayLabel = (): string =>
  new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(),
  );

const createListActionButton = (
  iconClass: string,
  ariaLabel: string,
  className = 'list-panel__action',
  onClick?: () => void,
): HTMLButtonElement => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.setAttribute('aria-label', ariaLabel);

  const icon = document.createElement('i');
  icon.className = iconClass;
  icon.setAttribute('aria-hidden', 'true');
  button.append(icon);
  if (onClick) button.addEventListener('click', onClick);

  return button;
};

const togglePaymentPanel = (): void => {
  isPaymentPanelOpen = !isPaymentPanelOpen;

  const workspace = root.querySelector<HTMLElement>('.main-screen__workspace');
  workspace?.classList.toggle('main-screen__workspace--keypad-hidden', !isPaymentPanelOpen);

  const keyboardButton = root.querySelector<HTMLButtonElement>('.list-panel__keyboard-action');
  keyboardButton?.setAttribute('aria-expanded', String(isPaymentPanelOpen));
  keyboardButton?.setAttribute(
    'aria-label',
    isPaymentPanelOpen ? 'Ocultar panel de teclado' : 'Mostrar panel de teclado',
  );
};

const render = (): void => {
  const state = store.getState();
  const visibleRemittances = listController.getVisibleRemittances();

  const content = document.createElement('div');
  content.className = 'main-screen';

  const workspace = document.createElement('div');
  workspace.className = 'main-screen__workspace';
  if (!isPaymentPanelOpen) workspace.classList.add('main-screen__workspace--keypad-hidden');
  workspace.append(
    createPaymentForm({
      value: state.paymentInput,
      onDigit: paymentController.appendDigit,
      onDelete: paymentController.deleteLastDigit,
      onConfirm: paymentController.charge,
    }),
  );

  const rightColumn = document.createElement('div');
  rightColumn.className = 'main-screen__right-column';
  rightColumn.append(
    createTopbar({
      user: {
        name: 'Elizabeth',
        role: 'Operador',
        avatarUrl: userElizabethAvatar,
        onNotificationsClick: () => alertManager.show('No hay notificaciones', 'error'),
      },
    }),
  );

  const listPanel = document.createElement('section');
  listPanel.className = 'list-panel';

  const listHeader = document.createElement('div');
  listHeader.className = 'list-panel__header';
  const date = document.createElement('div');
  const today = document.createElement('strong');
  today.textContent = 'Hoy';
  const dateLabel = document.createElement('span');
  dateLabel.textContent = getTodayLabel();
  date.append(today, dateLabel);

  const keypadButton = createListActionButton(
    'fa-solid fa-keyboard',
    isPaymentPanelOpen ? 'Ocultar panel de teclado' : 'Mostrar panel de teclado',
    'list-panel__calendar-action list-panel__keyboard-action',
    togglePaymentPanel,
  );
  keypadButton.setAttribute('aria-expanded', String(isPaymentPanelOpen));
  listHeader.append(date, keypadButton);

  const actions = document.createElement('div');
  actions.className = 'list-panel__actions';
  const searchButton = createListActionButton(
    'fa-solid fa-magnifying-glass',
    'Mostrar búsqueda de remesas',
    'list-panel__action',
    listController.showSearch,
  );
  searchButton.setAttribute('aria-expanded', String(state.isSearchOpen));

  actions.append(
    searchButton,
    createFilterDropdown({
      isOpen: state.isFilterOpen,
      field: state.sortField === 'charged_at' ? null : state.sortField,
      direction: state.sortDirection,
      statusFilter: state.statusFilter,
      onToggle: listController.toggleFilterDropdown,
      onFieldSelect: listController.selectSortField,
      onDirectionToggle: listController.toggleSortDirection,
      onStatusSelect: listController.selectStatusFilter,
    }),
    createListActionButton(
      'fa-solid fa-print',
      'Imprimir listado filtrado',
      'list-panel__action',
      listController.printFilteredList,
    ),
  );

  listPanel.append(listHeader, actions);

  if (state.isLoading) {
    listPanel.append(createActivityLoader());
  } else {
    if (state.searchQuery) {
      listPanel.append(
        createSearchLabel({
          query: state.searchQuery,
          onClear: listController.restoreSearch,
        }),
      );
    }

    if (state.isSearchOpen) {
      listPanel.append(
        createSearchBar({
          value: state.searchQuery,
          onSearch: listController.search,
        }),
      );
    }

    listPanel.append(
      createRemittanceList({
        items: visibleRemittances.items,
        onRestore: state.searchQuery ? listController.restoreSearch : undefined,
        onItemSelect: paymentController.selectRemittanceId,
      }),
      createPagination({
        currentPage: visibleRemittances.currentPage,
        totalPages: visibleRemittances.totalPages,
        onPageChange: listController.changePage,
      }),
    );
  }

  rightColumn.append(listPanel);
  workspace.append(rightColumn);
  content.append(workspace);

  if (state.alert) {
    content.append(
      createAlert({
        ...state.alert,
        onDismiss: alertManager.clear,
      }),
    );
  }

  root.replaceChildren(
    createAppShell({
      sidebar: createSidebar({
        activeItemId: state.selectedSidebarItem,
        onMenuSelect: (itemId) => {
          const area = sidebarMenuItems.find((item) => item.id === itemId)?.label ?? itemId;
          store.setState({ selectedSidebarItem: itemId });
          alertManager.notifyAreaSelected(area);
        },
      }),
      content,
    }),
  );
};

store.subscribe(render);
window.addEventListener('beforeunload', listController.dispose, { once: true });
render();
