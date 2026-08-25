import { createButton } from './Button';
import type { SearchBarOptions } from '../types/ComponentsTypes';

export const createSearchBar = ({
  placeholder = 'Buscar por ID, compañía o monto',
  value = '',
  onSearch,
}: SearchBarOptions): HTMLFormElement => {
  const form = document.createElement('form');
  form.className = 'search-bar';
  form.setAttribute('role', 'search');

  const input = document.createElement('input');
  input.className = 'search-bar__input';
  input.type = 'search';
  input.name = 'query';
  input.placeholder = placeholder;
  input.value = value;
  input.setAttribute('aria-label', placeholder);

  const button = createButton({
    label: 'Buscar',
    type: 'outline',
    size: 'sm',
  });
  button.type = 'submit';
  button.setAttribute('aria-label', 'Buscar remesas');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onSearch(input.value.trim());
  });

  form.append(input, button);
  return form;
};
