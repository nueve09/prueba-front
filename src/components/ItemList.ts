import type { ItemListOptions } from '../types/ComponentsTypes';
import { formatCurrency } from '../utils/Formatters';

export const createItemList = ({ id, company, amount, onSelect }: ItemListOptions): HTMLLIElement => {
  const item = document.createElement('li');
  item.className = 'item-list';

  if (onSelect) {
    item.classList.add('item-list--selectable');
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Seleccionar remesa ${id}`);
    item.addEventListener('click', () => onSelect(id));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(id);
      }
    });
  }

  const idElement = document.createElement('span');
  idElement.className = 'item-list__id';
  idElement.textContent = `#${id}`;

  const companyElement = document.createElement('span');
  companyElement.className = 'item-list__company';
  companyElement.textContent = company;

  const amountElement = document.createElement('span');
  amountElement.className = 'item-list__amount';
  amountElement.textContent = formatCurrency(amount);

  item.append(idElement, companyElement, amountElement);
  return item;
};
