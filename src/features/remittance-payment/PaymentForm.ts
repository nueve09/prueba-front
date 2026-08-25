import { createKeypad } from './Keypad';

export interface PaymentFormOptions {
  value: string;
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onConfirm: () => void;
}

export const createPaymentForm = ({
  value,
  onDigit,
  onDelete,
  onConfirm,
}: PaymentFormOptions): HTMLElement => {
  const section = document.createElement('section');
  section.className = 'payment-form';
  section.setAttribute('aria-labelledby', 'payment-form-title');

  const applicationTitle = document.createElement('h1');
  applicationTitle.className = 'payment-form__application-title';
  applicationTitle.append('Ventanilla ');

  const digitalLabel = document.createElement('strong');
  digitalLabel.textContent = 'Digital';
  applicationTitle.append(digitalLabel);

  const heading = document.createElement('h2');
  heading.className = 'payment-form__title';
  heading.id = 'payment-form-title';
  heading.textContent = 'Remesas';

  const input = document.createElement('input');
  input.className = 'payment-form__input';
  input.type = 'text';
  input.value = value;
  input.placeholder = 'ID de remesa';
  input.readOnly = true;
  input.setAttribute('aria-label', 'ID de remesa capturado');

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'payment-form__input-wrapper';

  const inputPrefix = document.createElement('span');
  inputPrefix.className = 'payment-form__input-prefix';
  inputPrefix.textContent = '#';
  inputPrefix.setAttribute('aria-hidden', 'true');

  inputWrapper.append(inputPrefix, input);
  section.append(
    applicationTitle,
    heading,
    inputWrapper,
    createKeypad({ onDigit, onDelete, onConfirm }),
  );

  return section;
};
