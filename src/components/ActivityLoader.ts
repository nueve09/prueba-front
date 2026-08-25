import type { ActivityLoaderOptions } from '../types/ComponentsTypes';

export const createActivityLoader = ({
  label = 'Cargando remesas...',
}: ActivityLoaderOptions = {}): HTMLElement => {
  const loader = document.createElement('div');
  loader.className = 'activity-loader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-live', 'polite');

  const spinner = document.createElement('span');
  spinner.className = 'activity-loader__spinner';
  spinner.setAttribute('aria-hidden', 'true');

  const message = document.createElement('span');
  message.className = 'activity-loader__label';
  message.textContent = label;

  loader.append(spinner, message);
  return loader;
};
