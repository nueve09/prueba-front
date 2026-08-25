import type { SearchLabelOptions } from '../types/ComponentsTypes';

export const createSearchLabel = ({ query, onClear }: SearchLabelOptions): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'search-label';
  container.setAttribute('aria-label', `Búsqueda aplicada: ${query}`);

  const label = document.createElement('span');
  label.className = 'search-label__text';
  label.textContent = query;

  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.className = 'search-label__clear';
  clearButton.setAttribute('aria-label', 'Eliminar búsqueda');
  clearButton.addEventListener('click', onClear);

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';
  icon.setAttribute('aria-hidden', 'true');
  clearButton.append(icon);

  container.append(label, clearButton);
  return container;
};
