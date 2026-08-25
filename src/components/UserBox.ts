import type { UserBoxOptions } from '../types/ComponentsTypes';

export const createUserBox = ({
  name,
  role,
  avatarUrl,
  onNotificationsClick,
}: UserBoxOptions): HTMLElement => {
  const container = document.createElement('section');
  container.className = 'user-box';
  container.setAttribute('aria-label', 'Información de usuario');

  const notificationButton = document.createElement('button');
  notificationButton.type = 'button';
  notificationButton.className = 'user-box__notifications';
  notificationButton.setAttribute('aria-label', 'Ver notificaciones');
  notificationButton.textContent = '🔔';
  if (onNotificationsClick) notificationButton.addEventListener('click', onNotificationsClick);

  const avatar = avatarUrl ? document.createElement('img') : document.createElement('span');
  avatar.className = 'user-box__avatar';

  if (avatar instanceof HTMLImageElement && avatarUrl) {
    avatar.alt = `Foto de ${name}`;
    avatar.src = avatarUrl;
  } else {
    avatar.setAttribute('aria-label', `Inicial de ${name}`);
    avatar.textContent = name.trim().charAt(0).toUpperCase();
  }

  const details = document.createElement('div');
  details.className = 'user-box__details';

  const nameElement = document.createElement('p');
  nameElement.className = 'user-box__name';
  nameElement.textContent = name;

  const roleElement = document.createElement('p');
  roleElement.className = 'user-box__role';
  roleElement.textContent = role;

  details.append(nameElement, roleElement);
  container.append(notificationButton, avatar, details);
  return container;
};
