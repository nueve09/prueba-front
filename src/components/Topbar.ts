import { createUserBox } from './UserBox';
import type { TopbarOptions } from '../types/ComponentsTypes';

export const createTopbar = ({ title, user }: TopbarOptions): HTMLElement => {
  const topbar = document.createElement('header');
  topbar.className = 'topbar';

  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.className = 'topbar__title';
    titleElement.textContent = title;
    topbar.append(titleElement);
  }

  topbar.append(createUserBox(user));
  return topbar;
};
