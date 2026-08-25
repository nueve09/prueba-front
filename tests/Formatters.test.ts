import { describe, expect, it } from 'vitest';
import { formatCurrency } from '../src/utils/Formatters';

describe('Formatters', () => {
  it('formatea montos como moneda mexicana', () => {
    expect(formatCurrency(12000)).toBe('$12,000.00');
  });
});
