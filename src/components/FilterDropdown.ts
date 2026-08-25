import type { FilterDropdownOptions } from '../types/ComponentsTypes';

const filterOptions = [
  { value: 'id', label: 'ID' },
  { value: 'company', label: 'Compañía' },
  { value: 'amount', label: 'Monto' },
] as const;

const statusOptions = [
  { value: 'COBRADO', label: 'Cobradas' },
  { value: 'NO_COBRADO', label: 'No Cobradas' },
] as const;

export const createFilterDropdown = ({
  isOpen,
  field,
  direction,
  statusFilter,
  onToggle,
  onFieldSelect,
  onDirectionToggle,
  onStatusSelect,
}: FilterDropdownOptions): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'filter-dropdown';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'list-panel__action';
  trigger.setAttribute('aria-label', 'Ordenar listado');
  trigger.setAttribute('aria-expanded', String(isOpen));
  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.addEventListener('click', onToggle);

  const triggerIcon = document.createElement('i');
  triggerIcon.className = 'fa-solid fa-filter';
  triggerIcon.setAttribute('aria-hidden', 'true');
  trigger.append(triggerIcon);
  container.append(trigger);

  if (!isOpen) return container;

  const menu = document.createElement('div');
  menu.className = 'filter-dropdown__menu';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'Opciones de ordenamiento');

  filterOptions.forEach((option) => {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'filter-dropdown__option';
    optionButton.setAttribute('role', 'menuitemradio');
    optionButton.setAttribute('aria-checked', String(field === option.value));
    if (field === option.value) optionButton.classList.add('filter-dropdown__option--active');

    const radio = document.createElement('span');
    radio.className = 'filter-dropdown__radio';
    radio.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = option.label;
    optionButton.append(radio, label);
    optionButton.addEventListener('click', () => onFieldSelect(option.value));
    menu.append(optionButton);
  });

  const statusTitle = document.createElement('p');
  statusTitle.className = 'filter-dropdown__section-title';
  statusTitle.textContent = 'Estado';
  menu.append(statusTitle);

  statusOptions.forEach((option) => {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'filter-dropdown__option';
    optionButton.setAttribute('role', 'menuitemradio');
    optionButton.setAttribute('aria-checked', String(statusFilter === option.value));
    if (statusFilter === option.value) optionButton.classList.add('filter-dropdown__option--active');

    const radio = document.createElement('span');
    radio.className = 'filter-dropdown__radio';
    radio.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = option.label;
    optionButton.append(radio, label);
    optionButton.addEventListener('click', () => onStatusSelect(option.value));
    menu.append(optionButton);
  });

  const directionButton = document.createElement('button');
  directionButton.type = 'button';
  directionButton.className = 'filter-dropdown__direction';
  directionButton.setAttribute(
    'aria-label',
    `Cambiar a orden ${direction === 'desc' ? 'ascendente' : 'descendente'}`,
  );

  const directionIcon = document.createElement('i');
  directionIcon.className = `fa-solid ${direction === 'asc' ? 'fa-arrow-up-wide-short' : 'fa-arrow-down-wide-short'}`;
  directionIcon.setAttribute('aria-hidden', 'true');

  const directionLabel = document.createElement('span');
  directionLabel.textContent = direction === 'asc' ? 'Ascendente' : 'Descendente';
  directionButton.append(directionIcon, directionLabel);
  directionButton.addEventListener('click', onDirectionToggle);
  menu.append(directionButton);

  container.append(menu);
  return container;
};
