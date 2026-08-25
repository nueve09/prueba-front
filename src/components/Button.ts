import type { ButtonProps, ButtonType } from '../types/ComponentsTypes';

const buttonStyles: Record<ButtonType, { background: string; foreground: string }> = {
  primary: { background: '#2c13b9', foreground: '#ffffff' },
  secondary: { background: '#f4f3f6', foreground: '#3d3d3d' },
  outline: { background: 'transparent', foreground: '#2c13b9' },
  ghost: { background: 'transparent', foreground: '#5b5b5b' },
  keypad: { background: '#f7f5f5', foreground: '#444444' },
};

export const createButton = ({
  label,
  onClick,
  bgcolor,
  color,
  size = 'md',
  type = 'primary',
}: ButtonProps): HTMLButtonElement => {
  const button = document.createElement('button');
  const style = buttonStyles[type];

  button.type = 'button';
  button.className = `button button--${type} button--${size}`;
  button.textContent = label;
  button.style.setProperty('--button-bg', bgcolor ?? style.background);
  button.style.setProperty('--button-color', color ?? style.foreground);

  if (type === 'outline') {
    button.style.setProperty('--button-border', bgcolor ?? style.foreground);
  }

  if (onClick) button.addEventListener('click', onClick);

  return button;
};
