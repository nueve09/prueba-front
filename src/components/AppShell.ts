import type { AppShellOptions } from '../types/ComponentsTypes';

export const createAppShell = ({ sidebar, content }: AppShellOptions): HTMLElement => {
  const shell = document.createElement('main');
  shell.className = 'app-shell';

  const sidebarContainer = document.createElement('aside');
  sidebarContainer.className = 'app-shell__sidebar';
  sidebarContainer.append(sidebar);

  const contentContainer = document.createElement('section');
  contentContainer.className = 'app-shell__content';
  contentContainer.append(content);

  shell.append(sidebarContainer, contentContainer);
  return shell;
};
