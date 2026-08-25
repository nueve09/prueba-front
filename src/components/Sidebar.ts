import { createSidebarMenu } from './SidebarMenu';
import { sidebarMenuItems } from './SidebarMenu';
import type { SidebarOptions } from '../types/ComponentsTypes';
import n09Logo from '../../assets/images/n09-logo.png';

export const createSidebar = ({
  brand = 'n09',
  menuItems = sidebarMenuItems,
  activeItemId,
  onMenuSelect,
}: SidebarOptions): HTMLElement => {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';

  const brandElement = document.createElement('a');
  brandElement.className = 'sidebar__brand';
  brandElement.href = '/';
  brandElement.setAttribute('aria-label', 'Ir al inicio');

  const brandImage = document.createElement('img');
  brandImage.className = 'sidebar__brand-image';
  brandImage.src = n09Logo;
  brandImage.alt = brand;
  brandElement.append(brandImage);

  sidebar.append(
    brandElement,
    createSidebarMenu({
      items: menuItems,
      activeItemId,
      onSelect: onMenuSelect,
    }),
  );

  return sidebar;
};
