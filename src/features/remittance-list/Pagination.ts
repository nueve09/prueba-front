export interface PaginationOptions {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const createPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationOptions): HTMLElement => {
  const navigation = document.createElement('nav');
  navigation.className = 'pagination';
  navigation.setAttribute('aria-label', 'Paginación de remesas');

  if (totalPages <= 1) return navigation;

  const createPageButton = (label: string, page: number, disabled = false): HTMLButtonElement => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pagination__button';
    button.textContent = label;
    button.disabled = disabled;
    button.addEventListener('click', () => onPageChange(page));
    return button;
  };

  const createIconButton = (
    iconClass: string,
    ariaLabel: string,
    page: number,
    disabled = false,
  ): HTMLButtonElement => {
    const button = createPageButton('', page, disabled);
    button.setAttribute('aria-label', ariaLabel);

    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon);

    return button;
  };

  navigation.append(
    createIconButton('fa-solid fa-chevron-left', 'Página anterior', currentPage - 1, currentPage === 1),
  );

  for (let page = 1; page <= totalPages; page += 1) {
    const button = createPageButton(String(page), page);
    if (page === currentPage) button.setAttribute('aria-current', 'page');
    navigation.append(button);
  }

  navigation.append(
    createIconButton('fa-solid fa-chevron-right', 'Página siguiente', currentPage + 1, currentPage === totalPages),
  );
  return navigation;
};
