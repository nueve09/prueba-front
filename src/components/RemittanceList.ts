import { createItemList } from './ItemList';
import type { RemittanceListOptions } from '../types/ComponentsTypes';

export const createRemittanceList = ({
  items,
  emptyMessage = 'No hay remesas para mostrar.',
  onRestore,
  onItemSelect,
}: RemittanceListOptions): HTMLElement => {
  const container = document.createElement('section');
  container.className = 'remittance-list';
  container.setAttribute('aria-label', 'Lista de remesas cobradas');

  if (items.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'remittance-list__empty';
    emptyState.textContent = emptyMessage;
    container.append(emptyState);

    if (onRestore) {
      const restoreButton = document.createElement('button');
      restoreButton.type = 'button';
      restoreButton.className = 'remittance-list__restore';
      restoreButton.setAttribute('aria-label', 'Regresar a la lista original');

      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-arrow-left';
      icon.setAttribute('aria-hidden', 'true');

      restoreButton.append(icon);
      restoreButton.addEventListener('click', onRestore);
      container.append(restoreButton);
    }

    return container;
  }

  const list = document.createElement('ul');
  list.className = 'remittance-list__items';
  items.forEach((item) => list.append(createItemList({ ...item, onSelect: onItemSelect })));

  container.append(list);
  return container;
};
