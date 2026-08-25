import { createButton } from '../../components/Button';

export interface KeypadOptions {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onConfirm: () => void;
}

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export const createKeypad = ({ onDigit, onDelete, onConfirm }: KeypadOptions): HTMLElement => {
  const keypad = document.createElement('div');
  keypad.className = 'keypad';
  keypad.setAttribute('aria-label', 'Teclado numérico');

  digits.forEach((digit) => {
    const button = createButton({
      label: digit,
      type: 'keypad',
      size: 'lg',
      onClick: () => onDigit(digit),
    });

    button.classList.add(`keypad__digit-${digit}`);
    keypad.append(button);
  });

  const decimalButton = createButton({
    label: '.',
    type: 'keypad',
    size: 'lg',
    onClick: () => onDigit('.'),
  });
  decimalButton.classList.add('keypad__decimal');
  decimalButton.setAttribute('aria-label', 'Agregar punto decimal');

  const deleteButton = createButton({
    label: '',
    type: 'keypad',
    size: 'lg',
    onClick: onDelete,
  });
  deleteButton.classList.add('keypad__delete');
  deleteButton.setAttribute('aria-label', 'Borrar último dígito');

  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa-solid fa-delete-left';
  deleteIcon.setAttribute('aria-hidden', 'true');
  deleteButton.append(deleteIcon);

  const confirmButton = createButton({
    label: '',
    type: 'primary',
    size: 'lg',
    onClick: onConfirm,
  });
  confirmButton.classList.add('keypad__confirm');
  confirmButton.setAttribute('aria-label', 'Cobrar remesa');

  const confirmIcon = document.createElement('i');
  confirmIcon.className = 'fa-solid fa-arrow-turn-down';
  confirmIcon.setAttribute('aria-hidden', 'true');
  confirmButton.append(confirmIcon);

  keypad.append(decimalButton, deleteButton, confirmButton);
  return keypad;
};
