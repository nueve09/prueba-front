import type { AlertOptions } from '../types/ComponentsTypes';

export const createAlert = ({
  message,
  type = 'info',
  onDismiss,
}: AlertOptions): HTMLElement => {
  const alert = document.createElement('div');
  alert.className = `alert alert--${type}`;
  alert.setAttribute('role', type === 'error' ? 'alert' : 'status');

  const text = document.createElement('p');
  text.className = 'alert__message';
  text.textContent = message;
  alert.append(text);

  if (onDismiss) {
    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.className = 'alert__dismiss';
    dismissButton.textContent = '×';
    dismissButton.setAttribute('aria-label', 'Cerrar mensaje');
    dismissButton.addEventListener('click', onDismiss);
    alert.append(dismissButton);
  }

  return alert;
};
